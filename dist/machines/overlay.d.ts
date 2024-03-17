interface OverlayStateSchema {
    states: {
        closed: {};
        opening: {
            states: {
                start: {};
                transition: {};
                immediately: {
                    states: {
                        open: {};
                        activating: {};
                    };
                };
                smoothly: {
                    states: {
                        visuallyHidden: {};
                        activating: {};
                        open: {};
                    };
                };
                end: {};
                done: {};
            };
        };
        open: {};
        dragging: {};
        snapping: {
            states: {
                start: {};
                snappingSmoothly: {};
                end: {};
                done: {};
            };
        };
        resizing: {
            states: {
                start: {};
                resizingSmoothly: {};
                end: {};
                done: {};
            };
        };
        closing: {
            states: {
                start: {};
                deactivating: {};
                closingSmoothly: {};
                end: {};
                done: {};
            };
        };
    };
}
type OverlayEvent = {
    type: 'OPEN';
} | {
    type: 'SNAP';
    payload: {
        y: number;
        velocity: number;
        source: 'dragging' | 'custom' | string;
    };
} | {
    type: 'CLOSE';
} | {
    type: 'DRAG';
} | {
    type: 'RESIZE';
};
interface OverlayContext {
    initialState: 'OPEN' | 'CLOSED';
    snapSource?: 'string';
}
export declare const overlayMachine: import("xstate").StateMachine<OverlayContext, OverlayStateSchema, OverlayEvent, any, import("xstate").BaseActionObject, import("xstate").ServiceMap, import("xstate").ResolveTypegenMeta<import("xstate").TypegenDisabled, OverlayEvent, import("xstate").BaseActionObject, import("xstate").ServiceMap>>;
export {};
