import Header from "@/src/Component/Header/header";
import RecentBox from "@/src/Component/RecentBox/RecentBox";
import { getMemos, getTasks } from "@/src/functions/CalenderTaskAdd";

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
