"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, StickyNote } from "lucide-react";
import { RecentDoc } from "@/src/types/addTaskType";
import { getRecentDocs } from "@/src/functions/CalenderTaskAdd";
import useRecentMemoStore from "@/src/Hook/useHistoryHook";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RecentBox() {
  const recentRefs = useRecentMemoStore((state) => state.recentRefs);
  const resetRecent = useRecentMemoStore((state) => state.resetRecent);
  const [docs, setDocs] = useState<RecentDoc[]>([]);

  // recentRefs 가 바뀔 때마다 서버에 (type, _id) 목록을 보내 문서를 다시 불러온다
  useEffect(() => {
    let alive = true;
    getRecentDocs(recentRefs).then((res) => {
      if (alive) setDocs(res.ok ? ((res.item ?? []) as RecentDoc[]) : []);
    });
    return () => {
      alive = false;
    };
  }, [recentRefs]);

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
              // type 을 같이 써야 컬렉션이 달라도 키가 겹치지 않는다
              <li
                key={`${doc.type}:${doc._id}`}
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
