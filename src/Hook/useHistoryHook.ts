import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RecentMemoState {
  recentIds: string[];
  addRecent: (id: string) => void;
  resetRecent: () => void;
}

const useRecentMemoStore = create<RecentMemoState>()(
  persist(
    (set, get) => ({
      recentIds: [],
      addRecent: (id) => {
        const filtered = get().recentIds.filter((v) => v !== id); // 중복 제거
        set({ recentIds: [id, ...filtered].slice(0, 10) }); // 최근 10개만
      },
      resetRecent: () => set({ recentIds: [] }),
    }),
    {
      name: "recent-memos",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useRecentMemoStore;
