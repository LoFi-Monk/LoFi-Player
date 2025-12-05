import { useState, useEffect } from 'react'
import PocketBase from 'pocketbase'
import MainLayout from '@/components/layout/MainLayout'
import { VideoPlayer } from '@/components/features/player/VideoPlayer'
import './App.css'

const pb = new PocketBase('http://127.0.0.1:8090');

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
    <MainLayout>
      <div className="w-full h-full relative">
        <VideoPlayer />
        <div className="absolute bottom-4 right-4 z-10 bg-black/50 p-2 rounded text-white text-xs">
          {pbStatus}
        </div>
      </div>
    </MainLayout>
  )
}

export default App
