import BookMarkBox from "@/src/Component/BookMarkBox/BookMarkBox";
import Header from "@/src/Component/Header/header";
import { getMemos, getTasks } from "@/src/functions/CalenderTaskAdd";

// [페이지] 북마크 (/importantSchedule) - 일정과 메모를 함께 받아 넘긴다
export default async function ImportantSchedule() {
  const [taskData, memoData] = await Promise.all([getTasks(), getMemos()]);
  const taskList = taskData.ok ? (taskData.item ?? []) : [];
  const memoList = memoData.ok ? (memoData.item ?? []) : [];
  return (
    <>
      <Header />
      <BookMarkBox taskList={taskList} memoList={memoList} />
    </>
  );
}
