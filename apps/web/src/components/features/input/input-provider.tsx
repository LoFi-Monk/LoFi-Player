import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { SpatialNavigation } from '@noriginmedia/norigin-spatial-navigation';

type InputMode = 'mouse' | 'navigation';

interface InputContextType {
    mode: InputMode;
}

const InputContext = createContext<InputContextType>({ mode: 'mouse' });

export const useInputMode = () => useContext(InputContext);

// Throttle time in milliseconds for navigation to prevent rapid scrolling
const NAVIGATION_THROTTLE = 200;
const BUTTON_THROTTLE = 300;

export function InputProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<InputMode>('mouse');

    // Refs to track throttling
    const lastNavTime = useRef(0);
    const lastButtonTime = useRef(0);

    useEffect(() => {
        const handleMouseMove = () => {
            if (mode !== 'mouse') setMode('mouse');
        };

        const handleKeyDown = () => {
            if (mode !== 'navigation') setMode('navigation');
        };

        const handlegamepad = () => {
            if (mode !== 'navigation') setMode('navigation');
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);

        // Gamepad polling loop
        let animationFrameId: number;

        const pollGamepads = () => {
            const gamepads = navigator.getGamepads();
            const now = Date.now();

            for (const gp of gamepads) {
                if (!gp) continue;

                // Detect input mode switch
                const anyButtonPressed = gp.buttons.some(b => b.pressed);
                const anyAxisMoved = gp.axes.some(a => Math.abs(a) > 0.5);

                if (anyButtonPressed || anyAxisMoved) {
                    handlegamepad();
                }

                if (mode !== 'navigation') continue;

                // --- Directional Navigation (D-Pad or Left Stick) ---
                if (now - lastNavTime.current > NAVIGATION_THROTTLE) {
                    let direction: 'up' | 'down' | 'left' | 'right' | null = null;

                    // Axis 0: Left/Right (-1/1)
                    if (gp.axes[0] < -0.5) direction = 'left';
                    else if (gp.axes[0] > 0.5) direction = 'right';

                    // Axis 1: Up/Down (-1/1)
                    if (gp.axes[1] < -0.5) direction = 'up';
                    else if (gp.axes[1] > 0.5) direction = 'down';

                    // D-Pad (Standard mapping: 12=Up, 13=Down, 14=Left, 15=Right)
                    if (gp.buttons[12]?.pressed) direction = 'up';
                    if (gp.buttons[13]?.pressed) direction = 'down';
                    if (gp.buttons[14]?.pressed) direction = 'left';
                    if (gp.buttons[15]?.pressed) direction = 'right';

                    if (direction) {
                        SpatialNavigation.navigateByDirection(direction, {});
                        lastNavTime.current = now;
                    }
                }

                // --- Action Buttons (A=Enter, B=Escape) ---
                if (now - lastButtonTime.current > BUTTON_THROTTLE) {
                    // Button 0 (A / Cross) -> Enter
                    if (gp.buttons[0]?.pressed) {
                        dispatchKeyEvent('Enter', 13);
                        lastButtonTime.current = now;
                    }

                    // Button 1 (B / Circle) -> Escape
                    if (gp.buttons[1]?.pressed) {
                        dispatchKeyEvent('Escape', 27);
                        lastButtonTime.current = now;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(pollGamepads);
        };

        pollGamepads();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mode]);

    useEffect(() => {
        // Toggle body class for styling (e.g., hiding cursor, showing focus outlines)
        if (mode === 'navigation') {
            document.body.classList.add('input-navigation');
            document.body.classList.remove('input-mouse');
        } else {
            document.body.classList.add('input-mouse');
            document.body.classList.remove('input-navigation');
        }
    }, [mode]);

    return (
        <InputContext.Provider value={{ mode }}>
            {children}
        </InputContext.Provider>
    );
}

// Helper to simulate keyboard events for library compatibility
function dispatchKeyEvent(key: string, keyCode: number) {
    const event = new KeyboardEvent('keydown', {
        key: key,
        code: key,
        keyCode: keyCode,
        bubbles: true,
        cancelable: true
    });

    // Dispatch to the currently focused element, or body if none
    (document.activeElement || document.body).dispatchEvent(event);

    // Also trigger keyup shortly after for "pressed" visuals if any
    setTimeout(() => {
        const upEvent = new KeyboardEvent('keyup', {
            key: key,
            code: key,
            keyCode: keyCode,
            bubbles: true,
            cancelable: true
        });
        (document.activeElement || document.body).dispatchEvent(upEvent);
    }, 100);
}
