import Image from "next/image";
import { CalendarDays, StickyNote } from "lucide-react";
import { MemoProps, RecentDoc, TaskProps } from "@/src/types/addTaskType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RecentBoxProps {
  taskList: TaskProps[];
  memoList: MemoProps[];
}

// 정렬 기준값. lastViewedAt 이 없는 문서는 애초에 isRecent 가 false 라 목록에 오지 않는다.
function viewedTime(doc: RecentDoc) {
  return doc.lastViewedAt ? new Date(doc.lastViewedAt).getTime() : 0;
}

export default function RecentBox({ taskList, memoList }: RecentBoxProps) {
  const docs: RecentDoc[] = [
    ...taskList.map((task) => ({ ...task, type: "task" as const })),
    ...memoList.map((memo) => ({ ...memo, type: "memo" as const })),
  ]
    .filter((doc) => doc.isRecent)
    .sort((a, b) => viewedTime(a) - viewedTime(b)); 
  return (
    <section className="max-w-10/12 m-auto mt-10 w-full">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">최근 본 문서</h2>
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
