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

interface SettingsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
    const { setTheme, theme } = useTheme()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden gap-0">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Manage your application preferences and configuration.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="general" orientation="vertical" className="flex-1 flex overflow-hidden">
                    {/* Sidebar / Tabs List */}
                    <div className="w-64 border-r bg-muted/30 p-4">
                        <TabsList className="flex flex-col h-auto w-full bg-transparent gap-1 p-0">
                            <TabsTrigger
                                value="general"
                                className="w-full justify-start gap-2 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                <Settings className="h-4 w-4" />
                                General
                            </TabsTrigger>
                            <TabsTrigger
                                value="keybindings"
                                className="w-full justify-start gap-2 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                <Keyboard className="h-4 w-4" />
                                Keybindings
                            </TabsTrigger>
                            <TabsTrigger
                                value="developer"
                                className="w-full justify-start gap-2 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                <Terminal className="h-4 w-4" />
                                Developer
                            </TabsTrigger>
                            <TabsTrigger
                                value="servers"
                                className="w-full justify-start gap-2 px-3 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                <Server className="h-4 w-4" />
                                Servers Status
                            </TabsTrigger>
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
                                        <Button
                                            variant={theme === "light" ? "default" : "outline"}
                                            onClick={() => setTheme("light")}
                                            className="w-32 justify-start gap-2"
                                        >
                                            <Sun className="h-4 w-4" />
                                            Light
                                        </Button>
                                        <Button
                                            variant={theme === "dark" ? "default" : "outline"}
                                            onClick={() => setTheme("dark")}
                                            className="w-32 justify-start gap-2"
                                        >
                                            <Moon className="h-4 w-4" />
                                            Dark
                                        </Button>
                                        <Button
                                            variant={theme === "system" ? "default" : "outline"}
                                            onClick={() => setTheme("system")}
                                            className="w-32 justify-start gap-2"
                                        >
                                            <Laptop className="h-4 w-4" />
                                            System
                                        </Button>
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
                                <p className="text-sm text-muted-foreground">Manage keyboard citations and gamepad mapping.</p>
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
            </DialogContent>
        </Dialog>
    )
}
