import Header from "@/src/Component/Header/header";
import TaskBox from "@/src/Component/TaskBox/taskBox";
import { getTasks } from "@/src/functions/CalenderTaskAdd";

export default async function MySchedule() {
  const data = await getTasks();
  const taskList = data.ok ? (data.item ?? []) : [];
  console.log("taskList", taskList);
  return (
    <>
      <Header />
      <TaskBox taskList={taskList} />
    </>
  );
}
