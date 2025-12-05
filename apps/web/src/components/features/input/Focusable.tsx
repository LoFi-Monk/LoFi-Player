import React from 'react';
import { useFocusable, FocusableComponentLayout } from '@noriginmedia/react-spatial-navigation';
import { cn } from '@/lib/utils';
import { useInputMode } from './input-provider';

interface FocusableProps {
    children: React.ReactNode;
    onFocus?: (layout: FocusableComponentLayout) => void;
    onEnter?: () => void;
    className?: string; // Base class
    focusedClassName?: string; // Class to add when focused (and in navigation mode)
    focusKey?: string;
}

export function Focusable({
    children,
    onFocus,
    onEnter,
    className,
    focusedClassName = 'ring-2 ring-primary ring-offset-2',
    focusKey
}: FocusableProps) {
    const { ref, focused } = useFocusable({
        onFocus,
        onEnter,
        focusKey,
        trackChildren: true
    });

    const { mode } = useInputMode();

    // Only show visual focus indication if we are in 'navigation' mode (Keyboard/Gamepad)
    // AND the item is actually focused.
    const isVisuallyFocused = focused && mode === 'navigation';

    return (
        <div
            ref={ref}
            className={cn(
                className,
                isVisuallyFocused && focusedClassName,
                "transition-all duration-200"
            )}
        >
            {children}
        </div>
    );
}
