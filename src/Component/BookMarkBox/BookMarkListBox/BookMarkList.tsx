"use client";

import { MemoProps, RecentDoc, TaskProps } from "@/src/types/addTaskType";
import BookMarkItem from "./BookMarkItem";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BookMarkListProps {
  taskList: TaskProps[];
  memoList: MemoProps[];
}

// [북마크] 일정과 메모를 합쳐 북마크된 것만 목록으로 보여준다
export default function BookMarkList({
  taskList,
  memoList,
}: BookMarkListProps) {
  const docs: RecentDoc[] = [
    ...taskList.map((task) => ({ ...task, type: "task" as const })),
    ...memoList.map((memo) => ({ ...memo, type: "memo" as const })),
  ].filter((doc) => doc.isBookMarked);

  if (docs.length === 0) {
    return (
      <p className="mt-10 rounded-2xl border border-dashed border-cream-200 py-16 text-center text-ink-600">
        북마크한 항목이 없어요. 일정이나 메모에서 북마크를 눌러보세요.
      </p>
    );
  }

  return (
    <ol className="mt-10 flex w-full flex-col gap-4">
      {docs.map((item) => (
        <BookMarkItem
          key={item._id}
          imgSrc={
            // 첨부는 메모에만 있다. type 으로 좁혀야 일정에서 에러가 안 난다.
            item.type === "memo" && item.attachment
              ? `${API_URL}/uploads/${item.attachment.filename}`
              : undefined
          }
          _id={item._id}
          type={item.type}
          title={item.title}
          content={item.content}
          startAt={item.startDate}
          deadLineAt={item.endDate}
          isBookMarked={item.isBookMarked ?? false}
        />
      ))}
    </ol>
  );
}
