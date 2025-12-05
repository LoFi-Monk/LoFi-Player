import { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
import MainLayout from '@/components/layout/MainLayout'
import { VideoPlayer } from '@/components/features/player/VideoPlayer'
import { ThemeProvider } from "@/components/theme-provider"
import { init } from '@noriginmedia/react-spatial-navigation'
import { InputProvider } from '@/components/features/input/input-provider'
import './App.css'

const pb = new PocketBase('http://127.0.0.1:8090');

// Initialize Spatial Navigation
init({
  debug: false,
  visualDebug: false
});

function App() {
  const [pbStatus, setPbStatus] = useState('Checking Backend...')

  useEffect(() => {
    pb.health.check().then(() => {
      setPbStatus('Connected to Mediaserver')
    }).catch((err) => {
      console.error(err)
      setPbStatus('Backend Disconnected')
    })
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <InputProvider>
        <MainLayout>
          <div className="w-full h-full relative">
            <VideoPlayer />
            <div className="absolute bottom-4 right-4 z-10 bg-black/50 p-2 rounded text-white text-xs">
              {pbStatus}
            </div>
          </div>
        </MainLayout>
      </InputProvider>
    </ThemeProvider>
  )
}

export default App
