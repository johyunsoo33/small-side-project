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

// ---------------------------------------------------------------------------
// 참고: 서버에 조회를 맡길 때 쓰던 (type, _id) 복합키 버전.
// _id 는 컬렉션 안에서만 유일해서, 서버에 "이 문서 줘" 라고 물어보려면
// 어느 컬렉션인지(type)까지 같이 들고 있어야 했다.
// 지금은 taskList / memoList 를 클라이언트가 통째로 갖고 있어서
// id 로 찾아낸 목록이 곧 type 이라 아래가 필요 없어졌다.
//
// import { DocType, RecentRef } from "@/src/types/addTaskType";
//
// interface RecentMemoState {
//   recentRefs: RecentRef[];
//   addRecent: (type: DocType, _id: string) => void;
//   resetRecent: () => void;
// }
//
// // _id 는 컬렉션 안에서만 의미가 있으므로 type 까지 합쳐야 유일한 키가 된다
// const refKey = (type: DocType, _id: string) => `${type}:${_id}`;
//
// const useRecentMemoStore = create<RecentMemoState>()(
//   persist(
//     (set, get) => ({
//       recentRefs: [],
//       addRecent: (type, _id) => {
//         const key = refKey(type, _id);
//         const filtered = get().recentRefs.filter(
//           (v) => refKey(v.type, v._id) !== key, // 중복 제거
//         );
//         set({ recentRefs: [{ type, _id }, ...filtered].slice(0, 10) });
//       },
//       resetRecent: () => set({ recentRefs: [] }),
//     }),
//     {
//       name: "recent-memos",
//       storage: createJSONStorage(() => sessionStorage),
//       version: 1,
//       // v0 는 메모 _id 만 저장했으므로 전부 memo 로 승격시킨다
//       migrate: (persisted, version) => {
//         if (version === 0) {
//           const { recentIds = [] } = (persisted ?? {}) as {
//             recentIds?: string[];
//           };
//           return {
//             recentRefs: recentIds.map((_id) => ({
//               type: "memo" as const,
//               _id,
//             })),
//           } as RecentMemoState;
//         }
//         return persisted as RecentMemoState;
//       },
//     },
//   ),
// );
