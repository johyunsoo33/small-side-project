"use client";
import { useState } from "react";
import MemoList from "../MemoBox/MemoListBox/MemoList";
import MemoPopUp from "../MemoBox/MemoPopUp/MemoPopUp";
import MemoTopBox from "../MemoBox/MemoTopBox/MemoTopBox";
import { MemoProps, TaskProps } from "@/src/types/addTaskType";

export default function MemoBox({ memoList }: { memoList: MemoProps[] }) {
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
