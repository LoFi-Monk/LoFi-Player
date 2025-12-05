import { init } from '@noriginmedia/react-spatial-navigation';
import { InputProvider } from '@/components/features/input/input-provider';

// Initialize Spatial Navigation
init({
  debug: false,
  visualDebug: false
});

// ... imports

function App() {
  // ... state

  // ... useEffect

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
