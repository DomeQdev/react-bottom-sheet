/* eslint-disable react/jsx-pascal-case */
import * as Portal from '@radix-ui/react-portal';
import React, { forwardRef, useRef, useState, useCallback } from 'react'
import { BottomSheet as _BottomSheet } from './BottomSheet'
import type { Props, RefHandles, SpringEvent } from './types'
import { useLayoutEffect } from './hooks'

export type {
  RefHandles as BottomSheetRef,
  Props as BottomSheetProps,
} from './types'

// Because SSR is annoying to deal with, and all the million complaints about window, navigator and dom elenents!
export const BottomSheet = forwardRef<RefHandles, Props>(function BottomSheet(
  { onSpringStart, onSpringEnd, skipInitialTransition, ...props },
  ref
) {
  const timerRef = useRef<ReturnType<typeof requestAnimationFrame>>()
  const lastSnapRef = useRef(null)
  // @TODO refactor to an initialState: OPEN | CLOSED property as it's much easier to understand
  // And informs what we should animate from. If the sheet is mounted with open = true, then initialState = OPEN.
  // When initialState = CLOSED, then internal sheet must first render with open={false} before setting open={props.open}
  // It's only when initialState and props.open is mismatching that a intial transition should happen
  // If they match then transitions will only happen when a user interaction or resize event happen.
  const initialStateRef = useRef<'OPEN' | 'CLOSED'>(
    skipInitialTransition && props.open ? 'OPEN' : 'CLOSED'
  )

  // Using layout effect to support cases where the bottom sheet have to appear already open, no transition
  useLayoutEffect(() => {
    if (props.open) {
      cancelAnimationFrame(timerRef.current)

      // Cleanup defaultOpen state on close
      return () => {
        initialStateRef.current = 'CLOSED'
      }
    }
  }, [props.open])

  const handleSpringStart = useCallback(
    async function handleSpringStart(event: SpringEvent) {
      // Forward the event
      await onSpringStart?.(event)

      if (event.type === 'OPEN') {
        // Ensures that when it's opening we abort any pending unmount action
        cancelAnimationFrame(timerRef.current)
      }
    },
    [onSpringStart]
  )

  const handleSpringEnd = useCallback(
    async function handleSpringEnd(event: SpringEvent) {
      // Forward the event
      await onSpringEnd?.(event)
    },
    [onSpringEnd]
  )

  return (
    <Portal.Root data-rsbs-portal>
      <_BottomSheet
        {...props}
        lastSnapRef={lastSnapRef}
        ref={ref}
        initialState={initialStateRef.current}
        onSpringStart={handleSpringStart}
        onSpringEnd={handleSpringEnd}
      />
    </Portal.Root>
  )
})
