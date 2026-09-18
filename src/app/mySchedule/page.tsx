import Header from "@/src/Component/Header/header";
import TaskBox from "@/src/Component/TaskBox/taskBox";
import { getTasks } from "@/src/functions/CalenderTaskAdd";

// [페이지] 일정 (/mySchedule) - 서버에서 일정 목록을 받아 달력에 넘긴다
export default async function MySchedule() {
  const data = await getTasks();
  const taskList = data.ok ? (data.item ?? []) : [];
  return (
    <>
      <Header />
      <TaskBox taskList={taskList} />
    </>
  );
}
