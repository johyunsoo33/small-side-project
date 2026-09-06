"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MemoProps, RecentDoc, TaskProps } from "@/src/types/addTaskType";
import BookMarkItem from "./BookMarkItem";
import BookMarkDetail from "../BookMarkDetailBox/BookMarkDetail";

import { markMemoViewed } from "@/src/functions/CalenderTaskAdd";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BookMarkListProps {
  taskList: TaskProps[];
  memoList: MemoProps[];
}

export default function BookMarkList({
  taskList,
  memoList,
}: BookMarkListProps) {
  const docs: RecentDoc[] = [
    ...taskList.map((task) => ({ ...task, type: "task" as const })),
    ...memoList.map((memo) => ({ ...memo, type: "memo" as const })),
  ].filter((doc) => doc.isBookMarked);

  const [selectedMemo, setSelectedMemo] = useState<MemoProps | null>(null);
  const router = useRouter();

  // const openMemoDetail = async (memo: MemoProps) => {
  //   setSelectedMemo(memo);

  //   // 상세는 바로 띄우고 조회 시각은 뒤이어 서버에 기록한다.
  //   const res = await markMemoViewed(memo._id);
  //   // 서버가 다시 계산한 isRecent / lastViewedAt 을 받아오기 위해 서버 컴포넌트를 새로 그린다
  //   if (res.ok) router.refresh();
  // };

  return (
    <>
      <ol className="max-w-10/12 mt-10 m-auto flex flex-col gap-4 w-full">
        {docs.map((item) => (
          <BookMarkItem
            key={item._id}
            // onClick={() => openMemoDetail(item)}
            imgSrc={
              // 첨부는 메모에만 있다. type 으로 좁혀야 일정(TaskProps)에서 에러가 안 난다
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
      {/* {selectedMemo && (
        <BookMarkDetail
          memo={selectedMemo}
          onClose={() => setSelectedMemo(null)}
        />
      )} */}
    </>
  );
}
