"use client";
import { useState } from "react";
import MemoList from "../MemoBox/MemoListBox/MemoList";
import MemoPopUp from "../MemoBox/MemoPopUp/MemoPopUp";
import MemoTopBox from "../MemoBox/MemoTopBox/MemoTopBox";
import { MemoProps } from "@/src/types/addTaskType";

// [메모] 메모 페이지의 최상위 박스. 목록과 생성 팝업을 묶는다.
export default function MemoBox({ memoList }: { memoList: MemoProps[] }) {
  const [open, setOpen] = useState(false);
  const createMemo = () => {
    setOpen(true);
  };
  const closePopUp = () => {
    setOpen(false);
  };
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <MemoTopBox createFunction={createMemo} />
      <MemoList memoList={memoList} />
      <MemoPopUp closePopUpFunction={closePopUp} popUpStatus={open} />
    </div>
  );
}
