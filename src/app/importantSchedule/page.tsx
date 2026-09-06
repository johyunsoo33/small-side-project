import BookMarkBox from "@/src/Component/BookMarkBox/BookMarkBox";
import Header from "@/src/Component/Header/header";
import { getMemos, getTasks } from "@/src/functions/CalenderTaskAdd";

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
