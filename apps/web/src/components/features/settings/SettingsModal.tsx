import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Settings, Keyboard, Terminal, Server } from "lucide-react"

interface SettingsModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
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
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">General Settings</h3>
                                <p className="text-sm text-muted-foreground">Application preferences will go here.</p>
                                {/* TODO: Add General Settings form */}
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
