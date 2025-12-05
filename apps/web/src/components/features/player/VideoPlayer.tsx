import { useRef, useEffect } from "react";

export function VideoPlayer() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Placeholder for future resize/fullscreen logic
    useEffect(() => {
        console.log("VideoPlayer mounted");
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden"
        >
            {/* Placeholder Content */}
            <div className="text-white text-center opacity-50">
                <p className="text-2xl font-mono">VIDEO_PLAYER_SURFACE</p>
                <p className="text-sm">Responsiveness handled by parent flex container</p>
            </div>

            {/* We will overlay controls here later */}
        </div>
    );
}
