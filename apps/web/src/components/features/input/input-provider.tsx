import React, { createContext, useContext, useEffect, useState } from 'react';

type InputMode = 'mouse' | 'navigation';

interface InputContextType {
    mode: InputMode;
}

const InputContext = createContext<InputContextType>({ mode: 'mouse' });

export const useInputMode = () => useContext(InputContext);

export function InputProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<InputMode>('mouse');

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
            for (const gp of gamepads) {
                if (gp) {
                    // Check for any button press or axis movement
                    const buttonPressed = gp.buttons.some(b => b.pressed);
                    const axisMoved = gp.axes.some(a => Math.abs(a) > 0.1);

                    if (buttonPressed || axisMoved) {
                        handlegamepad();
                        break;
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
