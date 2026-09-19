import Image from "next/image";
import { CalendarDays, StickyNote } from "lucide-react";
import { MemoProps, RecentDoc, TaskProps } from "@/src/types/addTaskType";
import PageHeader from "../PageHeader/PageHeader";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface RecentBoxProps {
  taskList: TaskProps[];
  memoList: MemoProps[];
}

// 정렬 기준값
function viewedTime(doc: RecentDoc) {
  return doc.lastViewedAt ? new Date(doc.lastViewedAt).getTime() : 0;
}

// [최근] 최근 24시간 안에 본 일정·메모를 모아 카드로 보여준다
export default function RecentBox({ taskList, memoList }: RecentBoxProps) {
  const docs: RecentDoc[] = [
    ...taskList.map((task) => ({ ...task, type: "task" as const })),
    ...memoList.map((memo) => ({ ...memo, type: "memo" as const })),
  ]
    .filter((doc) => doc.isRecent)
    .sort((a, b) => viewedTime(a) - viewedTime(b));

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <PageHeader
        eyebrow="최근"
        title="최근 본 문서"
        description="24시간 안에 열어본 일정과 메모가 자동으로 모여요."
      />

      {docs.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-cream-200 py-16 text-center text-ink-600">
          최근에 본 문서가 없습니다.
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => {
            const imgSrc =
              doc.type === "memo" && doc.attachment
                ? `${API_URL}/uploads/${doc.attachment.filename}`
                : undefined;

            return (
              <li
                key={doc._id}
                className="flex flex-col gap-3 rounded-2xl border border-cream-200 bg-white p-5"
              >
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    doc.type === "task"
                      ? "bg-clay-100 text-clay-600"
                      : "bg-honey-100 text-honey-500"
                  }`}
                >
                  {doc.type === "task" ? (
                    <CalendarDays size={13} />
                  ) : (
                    <StickyNote size={13} />
                  )}
                  {doc.type === "task" ? "일정" : "메모"}
                </span>

                {imgSrc && (
                  <Image
                    alt=""
                    src={imgSrc}
                    width={200}
                    height={120}
                    unoptimized
                    className="h-28 w-full rounded-lg object-cover"
                  />
                )}

                <p className="truncate font-semibold text-ink-900">{doc.title}</p>
                <div
                  className="line-clamp-2 text-sm text-ink-600"
                  dangerouslySetInnerHTML={{ __html: doc.content }}
                />
                <div className="flex gap-2 text-xs text-ink-600">
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
