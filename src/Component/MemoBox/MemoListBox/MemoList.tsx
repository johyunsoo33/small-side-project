"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MemoProps } from "@/src/types/addTaskType";
import MemoItem from "./MemoItem";

import MemoEditPopUp from "../MemoEditPopUp/MemoEditPopUp";
import { markMemoViewed } from "@/src/functions/CalenderTaskAdd";
import MemoDetail from "../MemoDetailBox/MemoDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MemoList({ memoList }: { memoList: MemoProps[] }) {
  const [selectedMemo, setSelectedMemo] = useState<MemoProps | null>(null);
  const [editingMemo, setEditingMemo] = useState<MemoProps | null>(null);
  const router = useRouter();

  const openMemoDetail = async (memo: MemoProps) => {
    setSelectedMemo(memo);

    // 상세는 바로 띄우고 조회 시각은 뒤이어 서버에 기록한다.
    const res = await markMemoViewed(memo._id);
    // 서버가 다시 계산한 isRecent / lastViewedAt 을 받아오기 위해 서버 컴포넌트를 새로 그린다
    if (res.ok) router.refresh();
  };

  return (
    <>
      <ol className="max-w-10/12 mt-10 m-auto flex flex-col gap-4 w-full">
        {memoList.map((item) => (
          <MemoItem
            key={item._id}
            onClick={() => openMemoDetail(item)}
            onEdit={() => setEditingMemo(item)}
            imgSrc={
              item?.attachment
                ? `${API_URL}/uploads/${item.attachment.filename}`
                : undefined
            }
            _id={item._id}
            title={item.title}
            content={item.content}
            startAt={item.startDate}
            deadLineAt={item.endDate}
            isBookMarked={item.isBookMarked ?? false}
          />
        ))}
      </ol>
      {selectedMemo && (
        <MemoDetail memo={selectedMemo} onClose={() => setSelectedMemo(null)} />
      )}
      <MemoEditPopUp memo={editingMemo} onClose={() => setEditingMemo(null)} />
    </>
  );
}
