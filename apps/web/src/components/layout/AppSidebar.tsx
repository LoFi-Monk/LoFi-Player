import * as React from "react"
import {
    Home,
    Tv,
    Film,
    Clapperboard,
    Waves,
    User,
    Settings,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { SettingsModal } from "@/components/features/settings/SettingsModal"

/**
 * AppSidebar
 * 
 * The main implementation of the collapsible sidebar.
 * It is designed to be the "Main Menu" of the application.
 * 
 * We separate this into its own component to keep the MainLayout clean
 * and to isolate the menu item logic.
 */
// Menu items configured array for easy extensibility.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Live TV",
        url: "#",
        icon: Tv,
    },
    {
        title: "Movies",
        url: "#",
        icon: Film,
    },
    {
        title: "Series",
        url: "#",
        icon: Clapperboard,
    },
    {
        title: "Fugazi TV",
        url: "#",
        icon: Waves,
    },
    {
        title: "Profile",
        url: "#",
        icon: User,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    const [settingsOpen, setSettingsOpen] = React.useState(false)

    return (
        <Sidebar
            collapsible="icon" // Default to icon-only collapsed state to maximize video area
            id="main-menu-area" // Used by Spatial Navigation to identify this Focus Zone
            data-area="main-menu" // Semantic marker for debugging/testing
        >
            <SidebarHeader className="p-4 border-b border-border/10">
                <span className="text-xl font-bold tracking-tight text-primary">LoFi</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        onClick={(e) => {
                                            if (item.title === "Settings") {
                                                e.preventDefault()
                                                setSettingsOpen(true)
                                            }
                                        }}
                                    >
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Settings Modal - Controlled by state */}
            <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
        </Sidebar>
    )
}
