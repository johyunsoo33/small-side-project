import Header from "@/src/Component/Header/header";
import RecentBox from "@/src/Component/RecentBox/RecentBox";
import { getMemos, getTasks } from "@/src/functions/CalenderTaskAdd";

// [페이지] 최근 본 문서 (/recent) - 일정과 메모를 함께 받아 넘긴다
export default async function Recent() {
  const [taskData, memoData] = await Promise.all([getTasks(), getMemos()]);
  const taskList = taskData.ok ? (taskData.item ?? []) : [];
  const memoList = memoData.ok ? (memoData.item ?? []) : [];

  return (
    <>
      <Header />
      <RecentBox taskList={taskList} memoList={memoList} />
    </>
  );
}
