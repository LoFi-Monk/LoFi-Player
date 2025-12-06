import { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
import { init } from '@noriginmedia/norigin-spatial-navigation'
import MainLayout from '@/components/layout/MainLayout'
import { VideoPlayer } from '@/components/features/player/VideoPlayer'
import { ThemeProvider } from "@/components/theme-provider"
import './App.css'

const pb = new PocketBase('http://127.0.0.1:8090');

/**
 * App Component
 * 
 * WHY: Root component that sets up the application.
 * HOW: Initializes spatial navigation in useEffect (after mount),
 *      wraps everything in ThemeProvider for dark mode support,
 *      and renders MainLayout which contains the sidebar and content.
 * 
 * NOTE: Spatial Navigation `init()` MUST be called in useEffect, not at module scope.
 * This is because the React 18 concurrent renderer can cause issues with global state
 * if initialized before the component tree is ready.
 */

// Track if init has been called to prevent double-invocation
// WHY: StrictMode in dev mode causes useEffect to run twice.
// Without this guard, spatial nav would be initialized twice, causing errors.
let isInitCalled = false;

function App() {
  const [pbStatus, setPbStatus] = useState('Checking Backend...')

  useEffect(() => {
    // Initialize Spatial Navigation AFTER component mounts
    // WHY: Calling init() at module scope causes blank page in React 18.
    // The navigation system needs the DOM to be ready before initialization.
    if (!isInitCalled) {
      try {
        init({
          debug: false,       // Set to true to see navigation decisions in console
          visualDebug: false  // Set to true to see focus outlines on screen
        });
        console.log("Spatial Navigation Initialized");
        isInitCalled = true;
      } catch (e) {
        console.error("Spatial Navigation Init Failed", e);
      }
    }

    // Check backend connectivity
    pb.health.check().then(() => {
      setPbStatus('Connected to Mediaserver')
    }).catch((err) => {
      console.error(err)
      setPbStatus('Backend Disconnected')
    })
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainLayout>
        <div className="w-full h-full relative">
          {/* Video Player - Takes up the full content area */}
          <VideoPlayer />

          {/* Backend Status Indicator - Bottom right corner */}
          <div className="absolute bottom-4 right-4 z-10 bg-black/50 p-2 rounded text-white text-xs">
            {pbStatus}
          </div>
        </div>
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
