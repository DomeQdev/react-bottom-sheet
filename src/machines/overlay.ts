import { Machine, assign } from 'xstate'

// This is the root machine, composing all the other machines and is the brain of the bottom sheet

interface OverlayStateSchema {
  states: {
    // the overlay usually starts in the closed position
    closed: {}
    opening: {
      states: {
        // Used to fire off the springStart event
        start: {}
        // Decide how to transition to the open state based on what the initialState is
        transition: {}
        // Fast enter animation, sheet is open by default
        immediately: {
          states: {
            open: {}
            activating: {}
          }
        }
        smoothly: {
          states: {
            // This state only happens when the overlay should start in an open state, instead of animating from the bottom
            // openImmediately: {}
            // visuallyHidden will render the overlay in the open state, but with opacity 0
            // doing this solves two problems:
            // on Android focusing an input element will trigger the softkeyboard to show up, which will change the viewport height
            // on iOS the focus event will break the view by triggering a scrollIntoView event if focus happens while the overlay is below the viewport and body got overflow:hidden
            // by rendering things with opacity 0 we ensure keyboards and scrollIntoView all happen in a way that match up with what the sheet will look like.
            // we can then move it to the opening position below the viewport, and animate it into view without worrying about height changes or scrolling overflow:hidden events
            visuallyHidden: {}
            // In this state we're activating focus traps, scroll locks and more, this will sometimes trigger soft keyboards and scrollIntoView
            // @TODO we might want to add a delay here before proceeding to open, to give android and iOS enough time to adjust the viewport when focusing an interactive element
            activating: {}
            // Animates from the bottom
            open: {}
          }
        }
        // Used to fire off the springEnd event
        end: {}
        // And finally we're ready to transition to open
        done: {}
      }
    }
    open: {}
    // dragging responds to user gestures, which may interrupt the opening state, closing state or snapping
    // when interrupting an opening event, it fires onSpringEnd(OPEN) before onSpringStart(DRAG)
    // when interrupting a closing event, it fires onSpringCancel(CLOSE) before onSpringStart(DRAG)
    // when interrupting a dragging event, it fires onSpringCancel(SNAP) before onSpringStart(DRAG)
    dragging: {}
    // snapping happens whenever transitioning to a new snap point, often after dragging
    snapping: {
      states: {
        start: {}
        snappingSmoothly: {}
        end: {}
        done: {}
      }
    }
    resizing: {
      states: {
        start: {}
        resizingSmoothly: {}
        end: {}
        done: {}
      }
    }
    closing: {
      states: {
        start: {}
        deactivating: {}
        closingSmoothly: {}
        end: {}
        done: {}
      }
    }
  }
}

type OverlayEvent =
  | { type: 'OPEN' }
  | {
      type: 'SNAP'
      payload: {
        y: number
        velocity: number
        source: 'dragging' | 'custom' | string
      }
    }
  | { type: 'CLOSE' }
  | { type: 'DRAG' }
  | { type: 'RESIZE' }

// The context (extended state) of the machine
interface OverlayContext {
  initialState: 'OPEN' | 'CLOSED'
  snapSource?: 'string'
}
function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const cancelOpen = {
  CLOSE: { target: '#overlay.closing', actions: 'onOpenCancel' },
}
const openToDrag = {
  DRAG: { target: '#overlay.dragging', actions: 'onOpenEnd' },
}
const openToResize = {
  RESIZE: { target: '#overlay.resizing', actions: 'onOpenEnd' },
}

const initiallyOpen = ({ initialState }) => initialState === 'OPEN'
const initiallyClosed = ({ initialState }) => initialState === 'CLOSED'

// Copy paste the machine into https://xstate.js.org/viz/ to make sense of what's going on in here ;)

export const overlayMachine = Machine<
  OverlayContext,
  OverlayStateSchema,
  OverlayEvent
>(
  {
    id: 'overlay',
    initial: 'closed',
    context: { initialState: 'CLOSED' },
    states: {
      closed: { on: { OPEN: 'opening', CLOSE: undefined } },
      opening: {
        initial: 'start',
        states: {
          start: {
            invoke: {
              src: 'onOpenStart',
              onDone: 'transition',
            },
          },
          transition: {
            always: [
              { target: 'immediately', cond: 'initiallyOpen' },
              { target: 'smoothly', cond: 'initiallyClosed' },
            ],
          },
          immediately: {
            initial: 'open',
            states: {
              open: {
                invoke: { src: 'openImmediately', onDone: 'activating' },
              },
              activating: {
                invoke: { src: 'activate', onDone: '#overlay.opening.end' },
                on: { ...openToDrag, ...openToResize },
              },
            },
          },
          smoothly: {
            initial: 'visuallyHidden',
            states: {
              visuallyHidden: {
                invoke: { src: 'renderVisuallyHidden', onDone: 'activating' },
              },
              activating: {
                invoke: { src: 'activate', onDone: 'open' },
              },
              open: {
                invoke: { src: 'openSmoothly', onDone: '#overlay.opening.end' },
                on: { ...openToDrag, ...openToResize },
              },
            },
          },
          end: {
            invoke: { src: 'onOpenEnd', onDone: 'done' },
            on: { CLOSE: '#overlay.closing', DRAG: '#overlay.dragging' },
          },
          done: {
            type: 'final',
          },
        },
        on: { ...cancelOpen },
        onDone: 'open',
      },
      open: {
        on: { DRAG: '#overlay.dragging', SNAP: 'snapping', RESIZE: 'resizing' },
      },
      dragging: {
        on: { SNAP: 'snapping' },
      },
      snapping: {
        initial: 'start',
        states: {
          start: {
            invoke: {
              src: 'onSnapStart',
              onDone: 'snappingSmoothly',
            },
            entry: [
              assign({
                // @ts-expect-error
                y: (_, { payload: { y } }) => y,
                // @ts-expect-error
                velocity: (_, { payload: { velocity } }) => velocity,
                // @ts-expect-error
                snapSource: (_, { payload: { source = 'custom' } }) => source,
              }),
            ],
          },
          snappingSmoothly: {
            invoke: { src: 'snapSmoothly', onDone: 'end' },
          },
          end: {
            invoke: { src: 'onSnapEnd', onDone: 'done' },
            on: {
              RESIZE: '#overlay.resizing',
              SNAP: '#overlay.snapping',
              CLOSE: '#overlay.closing',
              DRAG: '#overlay.dragging',
            },
          },
          done: { type: 'final' },
        },
        on: {
          SNAP: { target: 'snapping', actions: 'onSnapEnd' },
          RESIZE: { target: '#overlay.resizing', actions: 'onSnapCancel' },
          DRAG: { target: '#overlay.dragging', actions: 'onSnapCancel' },
          CLOSE: { target: '#overlay.closing', actions: 'onSnapCancel' },
        },
        onDone: 'open',
      },
      resizing: {
        initial: 'start',
        states: {
          start: {
            invoke: {
              src: 'onResizeStart',
              onDone: 'resizingSmoothly',
            },
          },
          resizingSmoothly: {
            invoke: { src: 'resizeSmoothly', onDone: 'end' },
          },
          end: {
            invoke: { src: 'onResizeEnd', onDone: 'done' },
            on: {
              SNAP: '#overlay.snapping',
              CLOSE: '#overlay.closing',
              DRAG: '#overlay.dragging',
            },
          },
          done: { type: 'final' },
        },
        on: {
          RESIZE: { target: 'resizing', actions: 'onResizeEnd' },
          SNAP: { target: 'snapping', actions: 'onResizeCancel' },
          DRAG: { target: '#overlay.dragging', actions: 'onResizeCancel' },
          CLOSE: { target: '#overlay.closing', actions: 'onResizeCancel' },
        },
        onDone: 'open',
      },
      closing: {
        initial: 'start',
        states: {
          start: {
            invoke: {
              src: 'onCloseStart',
              onDone: 'deactivating',
            },
            on: { OPEN: { target: '#overlay.open', actions: 'onCloseCancel' } },
          },
          deactivating: {
            invoke: { src: 'deactivate', onDone: 'closingSmoothly' },
          },
          closingSmoothly: {
            invoke: { src: 'closeSmoothly', onDone: 'end' },
          },
          end: {
            invoke: { src: 'onCloseEnd', onDone: 'done' },
            on: {
              OPEN: { target: '#overlay.opening', actions: 'onCloseCancel' },
            },
          },
          done: { type: 'final' },
        },
        on: {
          CLOSE: undefined,
          OPEN: { target: '#overlay.opening', actions: 'onCloseCancel' },
        },
        onDone: 'closed',
      },
    },
    on: {
      CLOSE: 'closing',
    },
  },
  {
    actions: {
      onOpenCancel: (context, event) => {},
      onSnapCancel: (context, event) => {},
      onResizeCancel: (context, event) => {},
      onCloseCancel: (context, event) => {},
      onOpenEnd: (context, event) => {},
      onSnapEnd: (context, event) => {},
      onResizeEnd: (context, event) => {},
    },
    services: {
      onSnapStart: async () => {
        await sleep()
      },
      onOpenStart: async () => {
        await sleep()
      },
      onCloseStart: async () => {
        await sleep()
      },
      onResizeStart: async () => {
        await sleep()
      },
      onSnapEnd: async () => {
        await sleep()
      },
      onOpenEnd: async () => {
        await sleep()
      },
      onCloseEnd: async () => {
        await sleep()
      },
      onResizeEnd: async () => {
        await sleep()
      },
      renderVisuallyHidden: async (context, event) => {
        await sleep()
      },
      activate: async (context, event) => {
        await sleep()
      },
      deactivate: async (context, event) => {
        await sleep()
      },
      openSmoothly: async (context, event) => {
        await sleep()
      },
      openImmediately: async (context, event) => {
        await sleep()
      },
      snapSmoothly: async (context, event) => {
        await sleep()
      },
      resizeSmoothly: async (context, event) => {
        await sleep()
      },
      closeSmoothly: async (context, event) => {
        await sleep()
      },
    },
    guards: { initiallyClosed, initiallyOpen },
  },
)
