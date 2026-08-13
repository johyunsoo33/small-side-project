"use client";

import { useState } from "react";
import { MemoProps } from "@/src/types/addTaskType";
import MemoItem from "./MemoItem";
import MemoDetail from "../MemoDetailBox/MemoDetail";
import useRecentMemoStore from "@/src/Hook/useHistoryHook";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function MemoList({ memoList }: { memoList: MemoProps[] }) {
  const [selectedMemo, setSelectedMemo] = useState<MemoProps | null>(null);
  const { addRecent } = useRecentMemoStore();
  return (
    <>
      <ol className="max-w-10/12 mt-10 m-auto flex flex-col gap-4 w-full">
        {memoList.map((item) => (
          <MemoItem
            key={item._id}
            onClick={() => {
              setSelectedMemo(item);
              addRecent(item._id);
            }}
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
          />
        ))}
      </ol>
      {selectedMemo && (
        <MemoDetail memo={selectedMemo} onClose={() => setSelectedMemo(null)} />
      )}
    </>
  );
}
