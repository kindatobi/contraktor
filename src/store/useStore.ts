import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    viewMode: 'grid' | 'list';
    toggleViewMode: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            viewMode: 'grid',
            toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === 'grid' ? 'list' : 'grid' })),
        }),
        {
            name: 'contraktor-storage',
            partialize: (state) => ({ viewMode: state.viewMode }),
        }
    )
);
