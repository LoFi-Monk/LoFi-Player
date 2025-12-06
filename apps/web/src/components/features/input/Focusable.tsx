import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { cn } from '@/lib/utils';

/**
 * Focusable Component Properties
 * 
 * WHY: Minimal wrapper to make any element navigable via spatial navigation.
 * HOW: Uses useFocusable hook from the CORRECT package (norigin-spatial-navigation).
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
}

/**
 * Focusable Wrapper Component
 * 
 * WHY: This component integrates UI elements with the Spatial Navigation engine.
 * HOW: The useFocusable hook returns a ref to attach to the DOM element and
 *      a focused boolean to conditionally apply styling.
 */
export function Focusable({
    children,
    onEnter,
    className,
    focusedClassName = 'ring-2 ring-primary ring-offset-2'
}: FocusableProps) {

    // Hook into spatial navigation system
    // ref: Must be attached to a DOM element for position calculation
    // focused: Boolean indicating if this element currently has focus
    const { ref, focused } = useFocusable({
        onEnterPress: onEnter
    });

    return (
        <div
            ref={ref}
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
