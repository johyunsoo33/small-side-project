"use client";
import { useState } from "react";
import MemoList from "./MemoListBox/MemoList";
import MemoPopUp from "./MemoPopUp/MemoPopUp";
import MemoTopBox from "./MemoTopBox/MemoTopBox";

export default function MemoBox() {
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
        <MemoList />
        <div className="MemoPopUp">
          <MemoPopUp closePopUpFunction={closePopUp} popUpStatus={open} />
        </div>
      </div>
    </>
  );
}
