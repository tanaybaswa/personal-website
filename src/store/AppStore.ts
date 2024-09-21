import { create } from "zustand";

// Define the Zustand store for all app state
interface AppState {
  darkModeEnabled: boolean;
  toggleDarkMode: () => void;

  activeSection: string;
  setActiveSection: (section: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  // Dark Mode State
  darkModeEnabled: false, // Default to light mode
  toggleDarkMode: () => set((state: { darkModeEnabled: boolean; }) => ({ darkModeEnabled: !state.darkModeEnabled })),

  // Active Section State
  activeSection: "home", // Default section
  setActiveSection: (section: string) => set(() => ({ activeSection: section })),
}));

export default useAppStore;
