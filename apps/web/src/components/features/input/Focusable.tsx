import { useEffect } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import { cn } from '@/lib/utils';

/**
 * Focusable Component Properties
 * 
 * WHY: Minimal wrapper to make any element navigable via spatial navigation.
 * HOW: Uses useFocusable hook from @noriginmedia/norigin-spatial-navigation.
 * 
 * NOTE: We migrated from the deprecated @noriginmedia/react-spatial-navigation
 * to @noriginmedia/norigin-spatial-navigation which is React 18 compatible.
 */
interface FocusableProps {
    children: React.ReactNode;
    /** Callback when 'Enter' is pressed on this element */
    onEnter?: () => void;
    /** Standard className (always applied) */
    className?: string;
    /** ClassName applied ONLY when focused */
    focusedClassName?: string;
    /** If true, this element will receive focus on initial render */
    autoFocus?: boolean;
    /** Optional unique key for the navigation engine */
    focusKey?: string;
}

/**
 * Focusable Wrapper Component
 * 
 * WHY: This component integrates UI elements with the Spatial Navigation engine.
 * HOW: The useFocusable hook returns a ref to attach to the DOM element and
 *      a focused boolean to conditionally apply styling.
 * 
 * EDGE CASE: autoFocus - Some elements (like "Home" in the menu) need to be
 * focused by default when the app loads. We use focusSelf() in useEffect for this.
 */
export function Focusable({
    children,
    onEnter,
    className,
    focusedClassName = 'bg-yellow-400 ring-4 ring-yellow-400',
    autoFocus = false,
    focusKey
}: FocusableProps) {

    // Hook into spatial navigation system
    // ref: Must be attached to a DOM element for position calculation
    // focused: Boolean indicating if this element currently has focus
    // focusSelf: Function to programmatically focus this element
    const { ref, focused, focusSelf } = useFocusable({
        onEnterPress: onEnter,
        focusKey
    });

    // DEBUG: Log when focused state changes
    useEffect(() => {
        console.log('Focusable focused state changed:', focused, 'focusKey:', focusKey);
    }, [focused, focusKey]);

    // Handle autoFocus on mount
    // WHY: Some elements need to be focused immediately when the UI loads
    // (e.g., the "Home" menu item should be focused by default)
    useEffect(() => {
        if (autoFocus) {
            console.log('Auto-focusing element:', focusKey);
            focusSelf();
        }
    }, [autoFocus, focusSelf, focusKey]);

    return (
        <div
            ref={ref}
            data-focused={focused}
            className={cn(
                className,
                focused && focusedClassName,
                "transition-all duration-200"
            )}
        >
            {children}
        </div>
    );
}
