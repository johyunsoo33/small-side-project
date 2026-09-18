"use client";
import BookMarkList from "./BookMarkListBox/BookMarkList";
import { MemoProps, TaskProps } from "@/src/types/addTaskType";

interface BookMarkBoxProps {
  taskList: TaskProps[];
  memoList: MemoProps[];
}

// [북마크] 북마크 페이지의 최상위 박스
export default function BookMarkBox({ taskList, memoList }: BookMarkBoxProps) {
  return (
    <>
      <div className="relative">
        <BookMarkList taskList={taskList} memoList={memoList} />
      </div>
    </>
  );
}
