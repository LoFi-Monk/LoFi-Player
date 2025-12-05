import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { SubMenuDrawer } from "./SubMenuDrawer"

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        // SidebarProvider is required at the root to manage the sidebar state (collapsed/expanded)
        // and to provide the context for the sidebar trigger and content pushing behavior.
        <SidebarProvider>
            <AppSidebar />

            {/* 
              Main container:
              - relative: Establish stacking context for children
              - overflow-hidden: Prevent scrollbars on the body, we want the app to feel like a TV interface
              - flex-1: Fill remaining space after sidebar
             */}
            <main className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-background">
                {/* 
                  Mobile/Collapsed Sidebar Trigger 
                  We place this absolutely to ensure it's always accessible but doesn't shift content flow unexpectedly.
                */}
                <div className="absolute left-2 top-2 z-50">
                    <SidebarTrigger />
                </div>

                {/* Content Area - Fullscreen ready 
                    We deliberately separate this div to implement a specific "Content Focus Area" 
                    for the Input System.
                */}
                <div
                    className="flex-1 w-full h-full relative"
                    id="content-area" // Focus Zone ID
                    data-area="content"
                >
                    {children}
                </div>

                {/* 
                  Global Drawers 
                  Placed at the end of the DOM to ensure they render on top (z-index) 
                  and don't affect the layout flow of the sidebar/content.
                */}
                <SubMenuDrawer />
            </main>
        </SidebarProvider>
    )
}
