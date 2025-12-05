import * as React from "react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function SubMenuDrawer() {
    const [open, setOpen] = React.useState(false)

    // This will be controlled by the FocusManager later
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {/* 
                   Hidden Trigger Button:
                   The Drawer component requires a Trigger to function declaratively in some modes.
                   We hide this visually (opacity-0) but keep it in the DOM. 
                   Eventually, the Spatial Navigation system will trigger `setOpen(true)` programmatically,
                   bypassing this button, but it serves as a fallback or anchor.
                */}
                <Button variant="outline" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 opacity-0 focus:opacity-100 hover:opacity-100 transition-opacity">
                    Open Submenu
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div
                    className="mx-auto w-full max-w-sm"
                    id="submenu-area"
                    data-area="submenu"
                >
                    <DrawerHeader>
                        <DrawerTitle>Media Options</DrawerTitle>
                        <DrawerDescription>Select an action.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 space-y-2">
                        <Button variant="secondary" className="w-full justify-start">Add to Favorites</Button>
                        <Button variant="secondary" className="w-full justify-start">View Details</Button>
                        <Button variant="secondary" className="w-full justify-start">Playback Settings</Button>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
