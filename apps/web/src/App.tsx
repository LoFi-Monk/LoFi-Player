import { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
import { init } from '@noriginmedia/norigin-spatial-navigation'
import { Focusable } from "@/components/features/input/Focusable"
import './App.css'

const pb = new PocketBase('http://127.0.0.1:8090');

// Input System V2: Verification with CORRECT package
// Using @noriginmedia/norigin-spatial-navigation (React 18 compatible)

// Track if init has been called to prevent double-invocation
let isInitCalled = false;

function App() {
  const [pbStatus, setPbStatus] = useState('Checking Backend...')

  useEffect(() => {
    // Prevent double init (StrictMode in dev causes double effects)
    if (!isInitCalled) {
      try {
        init({
          debug: true,
          visualDebug: true
        });
        console.log("Spatial Nav Initialized Successfully (CORRECT PACKAGE)");
        isInitCalled = true;
      } catch (e) {
        console.error("Spatial Nav Init Failed", e);
      }
    }

    pb.health.check().then(() => {
      setPbStatus('Connected to Mediaserver')
    }).catch((err) => {
      console.error(err)
      setPbStatus('Backend Disconnected')
    })
  }, [])

  return (
    <div className="w-full h-full relative p-10 bg-black text-white">
      <h1>Verification: Correct Package</h1>
      <p>Using @noriginmedia/norigin-spatial-navigation</p>

      <div className="flex gap-4 mt-8">
        <Focusable className="p-4 bg-gray-800 rounded" focusedClassName="bg-blue-600 ring-2 ring-white">
          <button>Focusable Item 1</button>
        </Focusable>

        <Focusable className="p-4 bg-gray-800 rounded" focusedClassName="bg-blue-600 ring-2 ring-white">
          <button>Focusable Item 2</button>
        </Focusable>
      </div>

      <div className="absolute bottom-4 right-4 z-10 bg-black/50 p-2 rounded text-white text-xs">
        {pbStatus}
      </div>
    </div>
  )
}

export default App
