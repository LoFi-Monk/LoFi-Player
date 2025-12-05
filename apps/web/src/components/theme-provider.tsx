import { createContext, useContext, useEffect, useState } from "react"

/**
 * Theme type definition.
 * - 'system': Follows the operating system's preference.
 * - 'light': Forces light mode.
 * - 'dark': Forces dark mode.
 */
type Theme = "dark" | "light" | "system"

/**
 * Props for the ThemeProvider component.
 */
type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

/**
 * State definition for the ThemeProvider context.
 */
type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

/**
 * ThemeProvider
 * 
 * Manages the application's visual theme (dark/light mode).
 * It persists the user's preference to localStorage and applies the
 * text-class 'dark' to the <html> element when appropriate.
 * 
 * @param children - The application content to wrap.
 * @param defaultTheme - The initial theme to use if none is saved (default: "system").
 * @param storageKey - The localStorage key to save the preference (default: "vite-ui-theme").
 */
export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    )

    useEffect(() => {
        const root = window.document.documentElement

        // Remove existing theme classes to prevent conflicts
        root.classList.remove("light", "dark")

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light"

            root.classList.add(systemTheme)
            return
        }

        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}

/**
 * Custom hook to access the ThemeContext.
 * Use this hook to get the current theme or change it.
 */
export const useTheme = () => {
    const context = useContext(ThemeProviderContext)

    if (context === undefined)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}
