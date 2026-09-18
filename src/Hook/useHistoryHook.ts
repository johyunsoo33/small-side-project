import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// [최근] 최근 본 메모 id 를 sessionStorage 에 최대 10개까지 보관하는 스토어
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
