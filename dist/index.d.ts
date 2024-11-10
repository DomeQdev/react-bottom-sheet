import React from 'react';
import type { RefHandles, SpringEvent } from './types';
export type { RefHandles as BottomSheetRef, Props as BottomSheetProps, } from './types';
export declare const BottomSheet: React.ForwardRefExoticComponent<{
    children: React.ReactNode;
    sibling?: React.ReactNode;
    onSpringStart?: (event: SpringEvent) => void;
    onSpringCancel?: (event: SpringEvent) => void;
    onSpringEnd?: (event: SpringEvent) => void;
    open: boolean;
    className?: string;
    footer?: React.ReactNode;
    header?: React.ReactNode;
    initialFocusRef?: false | React.RefObject<HTMLElement>;
    onDismiss?: () => void;
    blocking?: boolean;
    maxHeight?: number;
    scrollLocking?: boolean;
    snapPoints?: import("./types").snapPoints;
    defaultSnap?: number | ((props: import("./types").defaultSnapProps) => number);
    reserveScrollBarGap?: boolean;
    skipInitialTransition?: boolean;
    expandOnContentDrag?: boolean;
    disableExpandList?: string[];
    preventPullUp?: boolean;
} & Omit<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "children"> & React.RefAttributes<RefHandles>>;