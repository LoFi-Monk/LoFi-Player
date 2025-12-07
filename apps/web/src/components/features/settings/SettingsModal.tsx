import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import { cn } from "@/lib/utils";
import { Settings, Server, Paintbrush, Puzzle, Info } from "lucide-react";
import { useSettingsStore } from "@/stores/settings-store";
import type { SettingsSectionId } from "@/stores/settings-store";
import { Focusable } from "@/components/features/input/Focusable"; // Import our custom wrapper

// --- Types & Config ---

interface SettingsSectionConfig {
    id: SettingsSectionId;
    label: string;
    icon: React.ElementType;
    component: React.FC;
}

// Placeholder Components for Sections
const GeneralSettings = () => (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">General Settings</h2>
        <div className="bg-card/50 p-4 rounded-lg border border-border/50">
            <p className="text-muted-foreground">App preferences and locale settings.</p>
        </div>
    </div>
);

const ServerSettings = () => (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Server Status</h2>
        <div className="bg-card/50 p-4 rounded-lg border border-border/50">
            <p className="text-muted-foreground">Connection details for PocketBase and Media Server.</p>
        </div>
    </div>
);

const CustomizationSettings = () => (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Customization</h2>
        <div className="bg-card/50 p-4 rounded-lg border border-border/50">
            <p className="text-muted-foreground">Theme selection and visual tweaks.</p>
        </div>
    </div>
);

const PluginsSettings = () => (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Plugins</h2>
        <div className="bg-card/50 p-4 rounded-lg border border-border/50">
            <p className="text-muted-foreground">Manage extensions and scrapers.</p>
        </div>
    </div>
);

const AboutSettings = () => (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <div className="bg-card/50 p-4 rounded-lg border border-border/50">
            <p className="text-muted-foreground">LoFi Player v0.1.0 (Dev Build)</p>
        </div>
    </div>
);

const SECTIONS: SettingsSectionConfig[] = [
    { id: 'general', label: 'General', icon: Settings, component: GeneralSettings },
    { id: 'server', label: 'Server', icon: Server, component: ServerSettings },
    { id: 'customization', label: 'Customization', icon: Paintbrush, component: CustomizationSettings },
    { id: 'plugins', label: 'Plugins', icon: Puzzle, component: PluginsSettings },
    { id: 'about', label: 'About', icon: Info, component: AboutSettings },
];

// --- Sub-Components ---

const SettingsSidebarItem = ({ section }: { section: SettingsSectionConfig }) => {
    const { activeSection, setActiveSection } = useSettingsStore();
    const isActive = activeSection === section.id;

    return (
        <Focusable
            onEnter={() => setActiveSection(section.id)}
            focusKey={`SETTINGS-SIDEBAR-${section.id}`}
            className={cn(
                "flex items-center w-full px-4 py-3 mb-1 text-sm font-medium rounded-md transition-colors",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
            )}
            focusedClassName="ring-2 ring-primary bg-primary/20 text-primary z-10"
        >
            <section.icon className="w-4 h-4 mr-3" />
            <span>{section.label}</span>
        </Focusable>
    );
};

interface SettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialSection?: SettingsSectionId;
}

/**
 * SettingsModalContent (Inner Logic)
 * 
 * separated to ensure useFocusable has a valid DOM node when mounted
 */
function SettingsModalContent({ open, onOpenChange, initialSection }: SettingsModalProps) {
    const { activeSection, setActiveSection, resetSettingsNavigation } = useSettingsStore();

    // Parent Focus Context for the entire modal
    // isFocusBoundary: traps focus inside
    // autoRestoreFocus: returns focus to Sidebar Button on close
    const { ref, focusSelf, focusKey: modalFocusKey } = useFocusable({
        isFocusBoundary: true,
        focusKey: 'SETTINGS-MODAL',
        trackChildren: true,
        autoRestoreFocus: true,
        focusable: true // The container itself can receive focus initially
    });

    // Handle Initial Focus & Section
    React.useEffect(() => {
        if (open) {
            console.log("Settings Modal Opened");
            // 1. Set initial section if provided, otherwise 'general' (handled by store default)
            if (initialSection) setActiveSection(initialSection);

            // 2. Capture Focus
            // We focus the sidebar container first, or specific item logically
            focusSelf();
        } else {
            // Reset to 'general' on close so it feels fresh next time
            resetSettingsNavigation();
        }
    }, [open, focusSelf, initialSection, setActiveSection, resetSettingsNavigation]);

    const ActiveComponent = SECTIONS.find(s => s.id === activeSection)?.component || GeneralSettings;

    return (
        <FocusContext.Provider value={modalFocusKey}>
            <div ref={ref} className="flex h-full overflow-hidden" data-testid="settings-modal-content">

                {/* LEFT COLUMN: Sidebar Navigation */}
                <div className="w-64 border-r border-border bg-card/30 flex flex-col p-4 bg-muted/10">
                    <h3 className="text-lg font-semibold mb-4 px-2 tracking-tight">Settings</h3>
                    <div className="flex-1 space-y-1">
                        {SECTIONS.map((section) => (
                            <SettingsSidebarItem key={section.id} section={section} />
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: Content Area */}
                {/* We wrap this in a FocusContext too provided by useFocusable? 
                    Actually, we just need it to be a valid focus zone.
                */}
                <div className="flex-1 overflow-y-auto p-8 bg-background">
                    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
                        <ActiveComponent />
                    </div>
                </div>

            </div>
        </FocusContext.Provider>
    );
}

/**
 * SettingsModal (Outer Dialog)
 */
export function SettingsModal({ open, onOpenChange, initialSection }: SettingsModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[900px] h-[600px] p-0 overflow-hidden border-border bg-background shadow-2xl">
                {open && (
                    <SettingsModalContent
                        open={open}
                        onOpenChange={onOpenChange}
                        initialSection={initialSection}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
