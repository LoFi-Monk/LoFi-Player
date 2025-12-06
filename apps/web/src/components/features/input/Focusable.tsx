import React from 'react';
import { cn } from '@/lib/utils';
// import { useFocusable, FocusableComponentLayout } from '@noriginmedia/react-spatial-navigation';
// import { useInputMode } from './input-provider';

interface FocusableProps {
    children: React.ReactNode;
    onFocus?: (layout: any) => void;
    onEnter?: () => void;
    className?: string; // Base class
    focusedClassName?: string; // Class to add when focused (and in navigation mode)
    focusKey?: string;
    autoFocus?: boolean;
}

export function Focusable({
    children,
    className,
}: FocusableProps) {
    // Pass-through implementation for Safe Mode rollback
    return (
        <div className={cn(className, "transition-all duration-200")}>
            {children}
        </div>
    );
}
