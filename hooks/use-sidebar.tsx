import { create } from 'zustand';

type SidebarState = {
  isOpen: boolean;
  collapsed: boolean;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toggleCollapsed: () => void;
  collapseSidebar: () => void;
  setCollapsed: (collapsed: boolean) => void;
};

export const useSideBar = create<SidebarState>((set) => ({
  isOpen: false,
  isMobile: false,
  collapsed: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  collapseSidebar: () => set({ collapsed: true }),
  setCollapsed: (collapsed: boolean) => set({ collapsed }),
}));

