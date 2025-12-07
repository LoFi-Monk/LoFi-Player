import { create } from 'zustand'

export type SettingsSectionId =
    | 'general'
    | 'server'
    | 'customization'
    | 'plugins'
    | 'about';

interface SettingsState {
    // Navigation State
    activeSection: SettingsSectionId;
    setActiveSection: (section: SettingsSectionId) => void;

    // UI State
    isSidebarExpanded: boolean;
    toggleSidebar: () => void;
    setSidebarExpanded: (expanded: boolean) => void;

    // Actions
    resetSettingsNavigation: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    // Initial State defaults
    activeSection: 'general',
    isSidebarExpanded: true,

    // Actions
    setActiveSection: (section) => set({ activeSection: section }),

    toggleSidebar: () => set((state) => ({ isSidebarExpanded: !state.isSidebarExpanded })),
    setSidebarExpanded: (expanded) => set({ isSidebarExpanded: expanded }),

    resetSettingsNavigation: () => set({ activeSection: 'general' })
}))
