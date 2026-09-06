"use client";
import BookMarkList from "./BookMarkListBox/BookMarkList";
import { MemoProps, TaskProps } from "@/src/types/addTaskType";

interface BookMarkBoxProps {
  taskList: TaskProps[];
  memoList: MemoProps[];
}

export default function BookMarkBox({ taskList, memoList }: BookMarkBoxProps) {
  return (
    <>
      <div className="relative">
        <BookMarkList taskList={taskList} memoList={memoList} />
      </div>
    </>
  );
}
