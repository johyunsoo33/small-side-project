"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, StickyNote } from "lucide-react";
import { MemoProps, RecentDoc, TaskProps } from "@/src/types/addTaskType";
import useRecentMemoStore from "@/src/Hook/useHistoryHook";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RecentBoxProps {
  taskList: TaskProps[];
  memoList: MemoProps[];
}

export default function RecentBox({ taskList, memoList }: RecentBoxProps) {
  const recentIds = useRecentMemoStore((state) => state.recentIds);
  const resetRecent = useRecentMemoStore((state) => state.resetRecent);

  // sessionStorage 는 서버에 없어서 SSR 때 recentIds 가 비어 있다.
  // docs 를 빈 배열로 시작시켜야 서버 HTML 과 첫 클라이언트 렌더가 어긋나지 않는다.
  const [docs, setDocs] = useState<RecentDoc[]>([]);

  useEffect(() => {
    // 두 목록을 _id 하나로 찾을 수 있게 합친다. 어느 목록에서 나왔는지가 곧 type 이다
    const docMap = new Map<string, RecentDoc>();
    taskList.forEach((task) => docMap.set(task._id, { ...task, type: "task" }));
    memoList.forEach((memo) => docMap.set(memo._id, { ...memo, type: "memo" }));

    // 최근 순서대로 꺼낸다. 삭제된 문서는 Map 에 없으므로 자연히 빠진다
    setDocs(
      recentIds
        .map((id) => docMap.get(id))
        .filter((doc): doc is RecentDoc => Boolean(doc)),
    );
  }, [recentIds, taskList, memoList]);

  return (
    <section className="max-w-10/12 m-auto mt-10 w-full">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">최근 본 문서</h2>
        {docs.length > 0 && (
          <button
            type="button"
            onClick={resetRecent}
            className="text-xs text-white/50 hover:text-white/80"
          >
            기록 지우기
          </button>
        )}
      </header>

      {docs.length === 0 ? (
        <p className="text-sm text-white/50">최근에 본 문서가 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => {
            const imgSrc =
              doc.type === "memo" && doc.attachment
                ? `${API_URL}/uploads/${doc.attachment.filename}`
                : undefined;

            return (
              <li
                key={doc._id}
                className="flex flex-col gap-2 rounded-lg bg-gray-300/20 p-4"
              >
                <div className="flex items-center gap-1.5 text-xs text-white/55">
                  {doc.type === "task" ? (
                    <CalendarDays size={14} />
                  ) : (
                    <StickyNote size={14} />
                  )}
                  <span>{doc.type === "task" ? "일정" : "메모"}</span>
                </div>

                {imgSrc && (
                  <Image
                    alt=""
                    src={imgSrc}
                    width={200}
                    height={120}
                    unoptimized
                    className="h-24 w-full rounded-md object-cover"
                  />
                )}

                <p className="truncate font-semibold">{doc.title}</p>
                <div
                  className="line-clamp-2 text-sm text-white/70"
                  dangerouslySetInnerHTML={{ __html: doc.content }}
                />
                <div className="flex gap-2 text-xs text-white/50">
                  <time>{doc.startDate.split("T")[0]}</time>
                  <span>~</span>
                  <time>{doc.endDate.split("T")[0]}</time>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
