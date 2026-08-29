"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskProps } from "@/src/types/addTaskType";
import useRecentMemoStore from "@/src/Hook/useHistoryHook";
import { markTaskViewed } from "@/src/functions/CalenderTaskAdd";
import TaskDetail from "../TaskDetailBox/TaskDetailBox";

export interface CalendarDate {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
}

interface TaskCalenderBoxProps {
  calendar: CalendarDate[];
}

// Date를 "YYYY-MM-DD" 문자열로 변환 (task.startDate/endDate와 같은 포맷으로 맞춰서 비교하기 위함)
function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// 문자열 비교로 startDate <= 셀 날짜 <= endDate 범위에 포함되는 태스크만 걸러냄 (YYYY-MM-DD는 사전순 정렬이 날짜순 정렬과 같아서 문자열 비교가 가능)
function getTasksForDate(taskList: TaskProps[], date: Date) {
  const dateKey = toDateKey(date);
  return taskList.filter(
    (task) => task.startDate <= dateKey && dateKey <= task.endDate,
  );
}

export default function TaskCalenderBox({
  calendar,
  taskList,
}: TaskCalenderBoxProps & { taskList: TaskProps[] }) {
  const addRecent = useRecentMemoStore((state) => state.addRecent);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const router = useRouter();

  const openTaskDetail = async (task: TaskProps) => {
    addRecent(task._id);
    setSelectedTask(task);

    // 상세 팝업은 바로 띄우고 기록은 뒤이어 보낸다.
    // 클릭할 때마다 보내야 24시간 창이 마지막으로 본 시점부터 다시 시작한다.
    const res = await markTaskViewed(task._id);

    // taskList 는 서버 컴포넌트에서 내려오므로, 서버가 새로 계산한 isRecent 를
    // 받아오려면 서버 컴포넌트를 다시 그려야 한다. 클라이언트 state 는 유지된다.
    if (res.ok) router.refresh();
  };

  return (
    <div className="taskCalenderBox max-w-11/12 mt-10 m-auto">
      <div className="taskCalender grid grid-cols-7 gap-4">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="font-bold text-white text-center">
            {day}
          </div>
        ))}

        {calendar.map((date, index) => {
          const tasksForDate = getTasksForDate(taskList, date.date);

          return (
            <div
              key={index}
              className={`min-w-28 min-h-28 pb-4 pl-1 pt-1 ${
                date.isCurrentMonth ? "text-white" : "text-gray-400"
              } border-1 border-white rounded-xl`}
            >
              <div>{date.day}</div>
              <div className="flex flex-col gap-1 mt-1">
                {tasksForDate.map((task) => (
                  <div
                    key={task._id}
                    onClick={() => openTaskDetail(task)}
                    // 최근 24시간 안에 본 일정은 테두리로 구분한다 (필요 없으면 ring 부분만 지우면 된다)
                    className={`truncate rounded bg-[#4F5DFF] px-1 text-xs text-white min-w-8/10 max-w-9/10 mx-auto cursor-pointer ${
                      task.isRecent ? "ring-1 ring-white/70" : ""
                    }`}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}
