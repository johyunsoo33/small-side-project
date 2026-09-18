"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MemoProps } from "@/src/types/addTaskType";
import MemoItem from "./MemoItem";

import MemoEditPopUp from "../MemoEditPopUp/MemoEditPopUp";
import { markMemoViewed } from "@/src/functions/CalenderTaskAdd";
import MemoDetail from "../MemoDetailBox/MemoDetail";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// [메모] 메모 목록. 카드 클릭 시 상세를, 수정 버튼 클릭 시 수정 팝업을 띄운다.
export default function MemoList({ memoList }: { memoList: MemoProps[] }) {
  const [selectedMemo, setSelectedMemo] = useState<MemoProps | null>(null);
  const [editingMemo, setEditingMemo] = useState<MemoProps | null>(null);
  const router = useRouter();

  // 상세를 띄우고 조회 시각을 서버에 기록한다 (최근 본 문서 목록에 반영)
  const openMemoDetail = async (memo: MemoProps) => {
    setSelectedMemo(memo);
    const res = await markMemoViewed(memo._id);
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
