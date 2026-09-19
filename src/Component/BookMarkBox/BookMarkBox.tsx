"use client";
import BookMarkList from "./BookMarkListBox/BookMarkList";
import PageHeader from "../PageHeader/PageHeader";
import { MemoProps, TaskProps } from "@/src/types/addTaskType";

interface BookMarkBoxProps {
  taskList: TaskProps[];
  memoList: MemoProps[];
}

// [북마크] 북마크 페이지의 최상위 박스
export default function BookMarkBox({ taskList, memoList }: BookMarkBoxProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <PageHeader
        eyebrow="북마크"
        title="놓치면 안 되는 것들"
        description="북마크해둔 일정과 메모를 한 곳에 모았어요."
      />
      <BookMarkList taskList={taskList} memoList={memoList} />
    </div>
  );
}
