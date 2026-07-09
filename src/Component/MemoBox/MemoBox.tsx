"use client";
import { useState } from "react";
import MemoList from "./MemoListBox/MemoList";
import MemoPopUp from "./MemoPopUp/MemoPopUp";
import MemoTopBox from "./MemoTopBox/MemoTopBox";
import { TaskProps } from "@/src/types/addTaskType";

export default function MemoBox({ memoList }: { memoList: TaskProps[] }) {
  const [open, setOpen] = useState(false);
  const createMemo = () => {
    setOpen(true);
  };
  const closePopUp = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="relative">
        <div className=""></div>
        <MemoTopBox createFunction={createMemo} />
        <MemoList memoList={memoList} />
        <div className="MemoPopUp">
          <MemoPopUp closePopUpFunction={closePopUp} popUpStatus={open} />
        </div>
      </div>
    </>
  );
}
