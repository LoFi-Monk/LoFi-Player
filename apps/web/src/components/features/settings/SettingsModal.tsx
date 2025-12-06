import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Settings, Keyboard, Terminal, Server, Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation'
import { Focusable } from "@/components/features/input/Focusable"
import { useEffect } from 'react'

interface SettingsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

/**
 * Settings Modal Component with Spatial Navigation
 * 
 * This modal implements proper focus management using norigin-spatial-navigation:
 * 
 * 1. Has its own FocusContext.Provider to isolate focus from main sidebar
 * 2. Uses isFocusBoundary to trap navigation inside the modal
 * 3. Uses autoRestoreFocus to return focus to Settings button when closed
 * 4. Uses focusSelf() in useEffect to move focus when modal opens
 * 
 * Reference: https://devportal.noriginmedia.com/docs/Norigin-Spatial-Navigation/
 */
export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden gap-0">
                <SettingsModalContent />
            </DialogContent>
        </Dialog>
    )
}

function SettingsModalContent() {
    const { setTheme, theme } = useTheme()

    /**
     * Parent focusable container for the Settings modal
     * 
     * WHY: Modal needs its own separate FocusContext to avoid interfering
     * with the main sidebar focus tracking when opened/closed.
     * 
     * CONFIG:
     * - focusable: false       -> Container itself isn't focusable, just provides context
     * - isFocusBoundary: true  -> Traps navigation inside modal (arrow keys can't escape)
     * - autoRestoreFocus: true -> Returns focus to Settings button when modal closes
     * - saveLastFocusedChild   -> Remembers which tab was focused if reopening
     * - trackChildren: true    -> Enables hasFocusedChild tracking
     */
    const { ref: modalContainerRef, focusKey: modalFocusKey, focusSelf } = useFocusable({
        focusable: false,
        saveLastFocusedChild: true,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: true,
        focusKey: 'SETTINGS-MODAL-CONTAINER'
    });

    /**
     * Move focus into modal when it opens/mounts
     */
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
            focusSelf();
        }, 100);
        return () => clearTimeout(timeoutId);
    }, [focusSelf]);

    return (
        <>
            <DialogHeader className="px-6 py-4 border-b">
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                    Manage your application preferences and configuration.
                </DialogDescription>
            </DialogHeader>

            {/* 
                Modal focus container with FocusContext.Provider
            */}
            <div ref={modalContainerRef} className="flex-1 flex overflow-hidden">
                <FocusContext.Provider value={modalFocusKey}>
                    <Tabs defaultValue="general" orientation="vertical" className="flex-1 flex overflow-hidden">
                        {/* Sidebar / Tabs List */}
                        <div className="w-64 border-r bg-muted/30 p-4">
                            <TabsList className="flex flex-col h-auto w-full bg-transparent gap-1 p-0">
                                {["general", "keybindings", "developer", "servers"].map((tab, index) => (
                                    <Focusable
                                        key={tab}
                                        focusKey={`settings-tab-${tab}`}
                                        autoFocus={index === 0}  // First tab gets autoFocus
                                        className="rounded-sm"
                                        focusedClassName="ring-2 ring-primary z-10"
                                    >
                                        <TabsTrigger
                                            value={tab}
                                            className="w-full justify-start gap-2 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm capitalize"
                                        >
                                            {tab === 'general' && <Settings className="h-4 w-4" />}
                                            {tab === 'keybindings' && <Keyboard className="h-4 w-4" />}
                                            {tab === 'developer' && <Terminal className="h-4 w-4" />}
                                            {tab === 'servers' && <Server className="h-4 w-4" />}
                                            {tab}
                                        </TabsTrigger>
                                    </Focusable>
                                ))}
                            </TabsList>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-auto p-6 bg-background">
                            <TabsContent value="general" className="mt-0 h-full">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium">Appearance</h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Customize the look and feel of the application.
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {[
                                                { mode: 'light', icon: Sun, label: 'Light' },
                                                { mode: 'dark', icon: Moon, label: 'Dark' },
                                                { mode: 'system', icon: Laptop, label: 'System' }
                                            ].map(({ mode, icon: Icon, label }) => (
                                                <Focusable
                                                    key={mode}
                                                    focusKey={`theme-${mode}`}
                                                    className="rounded-md"
                                                    focusedClassName="ring-2 ring-primary"
                                                    onEnter={() => setTheme(mode as any)}
                                                >
                                                    <Button
                                                        variant={theme === mode ? "default" : "outline"}
                                                        onClick={() => setTheme(mode as any)}
                                                        className="w-32 justify-start gap-2"
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                        {label}
                                                    </Button>
                                                </Focusable>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="border-t pt-4">
                                        <h3 className="text-lg font-medium">Coming Soon</h3>
                                        <p className="text-sm text-muted-foreground">More general settings will appear here.</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="keybindings" className="mt-0 h-full">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Keybindings</h3>
                                    <p className="text-sm text-muted-foreground">Manage keyboard shortcuts and gamepad mapping.</p>
                                    {/* TODO: Add Keybindings list */}
                                </div>
                            </TabsContent>

                            <TabsContent value="developer" className="mt-0 h-full">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Developer Settings</h3>
                                    <p className="text-sm text-muted-foreground">Debug tools and advanced configuration.</p>
                                </div>
                            </TabsContent>

                            <TabsContent value="servers" className="mt-0 h-full">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Servers Status</h3>
                                    <p className="text-sm text-muted-foreground">Monitor connected backend services.</p>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </FocusContext.Provider>
            </div>
        </>
    )
}
