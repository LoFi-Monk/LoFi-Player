import * as React from "react"
import {
    Home,
    Tv,
    Film,
    Clapperboard,
    Waves,
    User,
    Settings,
    Puzzle,
} from "lucide-react"
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation'
import { Focusable } from "@/components/features/input/Focusable"

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
        title: "Plugins",
        url: "#",
        icon: Puzzle, // Using Puzzle icon imported from lucide-react
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    // State for Settings Modal (open status + specific section to open to)
    const [settingsState, setSettingsState] = React.useState<{
        open: boolean;
        section?: "general" | "server" | "customization" | "plugins" | "about";
    }>({ open: false });

    // Helper to open settings to a specific section
    const openSettings = (section: "general" | "server" | "customization" | "plugins" | "about" = "general") => {
        setSettingsState({ open: true, section });
    };

    // Create parent focusable container for the sidebar
    // WHY: The library requires a parent FocusContext to manage child focus
    // NOTE: The parent itself is NOT focusable, it's just a container
    const { ref: containerRef, focusKey: sidebarFocusKey } = useFocusable({
        focusable: false,  // Parent container is not itself focusable
        saveLastFocusedChild: true,
        trackChildren: true,
        focusKey: 'SIDEBAR-CONTAINER'
    });

    return (
        <div ref={containerRef}>
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
                            <FocusContext.Provider value={sidebarFocusKey}>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <Focusable
                                                focusKey={item.title}
                                                autoFocus={item.title === 'Home'}
                                                onEnter={() => {
                                                    if (item.title === "Settings") {
                                                        openSettings("general");
                                                    } else if (item.title === "Plugins") {
                                                        openSettings("plugins");
                                                    } else {
                                                        window.location.href = item.url
                                                    }
                                                }}
                                                className="rounded-md outline-none transition-all duration-200"
                                                focusedClassName=""
                                            >
                                                <SidebarMenuButton
                                                    asChild
                                                    onClick={(e) => {
                                                        if (item.title === "Settings") {
                                                            e.preventDefault()
                                                            openSettings("general");
                                                        } else if (item.title === "Plugins") {
                                                            e.preventDefault()
                                                            openSettings("plugins");
                                                        }
                                                    }}
                                                    className="w-full"
                                                >
                                                    <a href={item.url}>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </Focusable>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </FocusContext.Provider>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                {/* Settings Modal - Controlled by state */}
                <SettingsModal
                    open={settingsState.open}
                    onOpenChange={(open: boolean) => setSettingsState(prev => ({ ...prev, open }))}
                    initialSection={settingsState.section}
                />
            </Sidebar>
        </div>
    )
}
