import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DocType, RecentRef } from "@/src/types/addTaskType";

interface RecentMemoState {
  recentRefs: RecentRef[];
  addRecent: (type: DocType, _id: string) => void;
  resetRecent: () => void;
}

// _id 는 컬렉션 안에서만 의미가 있으므로 type 까지 합쳐야 유일한 키가 된다
const refKey = (type: DocType, _id: string) => `${type}:${_id}`;

const useRecentMemoStore = create<RecentMemoState>()(
  persist(
    (set, get) => ({
      recentRefs: [],
      addRecent: (type, _id) => {
        const key = refKey(type, _id);
        const filtered = get().recentRefs.filter(
          (v) => refKey(v.type, v._id) !== key, // 중복 제거
        );
        set({ recentRefs: [{ type, _id }, ...filtered].slice(0, 10) }); // 최근 10개만
      },
      resetRecent: () => set({ recentRefs: [] }),
    }),
    {
      name: "recent-memos",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
      // v0 는 메모 _id 만 저장했으므로 전부 memo 로 승격시킨다
      migrate: (persisted, version) => {
        if (version === 0) {
          const { recentIds = [] } = (persisted ?? {}) as {
            recentIds?: string[];
          };
          return {
            recentRefs: recentIds.map((_id) => ({
              type: "memo" as const,
              _id,
            })),
          } as RecentMemoState;
        }
        return persisted as RecentMemoState;
      },
    },
  ),
);

export default useRecentMemoStore;
