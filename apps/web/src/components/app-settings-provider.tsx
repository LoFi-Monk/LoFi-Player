import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

/**
 * App Settings Context
 * 
 * WHY: Centralizes application preferences (like debug settings) in a single place.
 * HOW: Uses React Context to provide settings throughout the component tree.
 *      Settings are persisted to localStorage so they survive page reloads.
 * 
 * NOTE: This is separate from ThemeProvider because it handles non-theme settings.
 */

interface AppSettings {
    /** Enable spatial navigation visual debug (red outlines) */
    spatialNavDebug: boolean
    /** Enable spatial navigation console logging */
    spatialNavConsoleDebug: boolean
}

interface AppSettingsContextType {
    settings: AppSettings
    updateSettings: (updates: Partial<AppSettings>) => void
}

const defaultSettings: AppSettings = {
    spatialNavDebug: false,
    spatialNavConsoleDebug: false
}

const STORAGE_KEY = 'lofi-app-settings'

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined)

/**
 * AppSettingsProvider Component
 * 
 * WHY: Wraps the app to provide settings context to all children.
 * HOW: Loads settings from localStorage on mount, saves on change.
 */
export function AppSettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<AppSettings>(() => {
        // Load from localStorage on initial render
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                return { ...defaultSettings, ...JSON.parse(stored) }
            }
        } catch (e) {
            console.error('Failed to load app settings:', e)
        }
        return defaultSettings
    })

    // Persist settings to localStorage when they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
        } catch (e) {
            console.error('Failed to save app settings:', e)
        }
    }, [settings])

    const updateSettings = (updates: Partial<AppSettings>) => {
        setSettings(prev => ({ ...prev, ...updates }))
    }

    return (
        <AppSettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

/**
 * useAppSettings Hook
 * 
 * WHY: Easy access to app settings from any component.
 * HOW: Returns the current settings and an update function.
 */
export function useAppSettings() {
    const context = useContext(AppSettingsContext)
    if (context === undefined) {
        throw new Error('useAppSettings must be used within an AppSettingsProvider')
    }
    return context
}
