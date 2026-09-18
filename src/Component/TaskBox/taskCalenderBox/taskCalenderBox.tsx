"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskProps } from "@/src/types/addTaskType";
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

// Date 를 "YYYY-MM-DD" 로 변환
function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// 해당 날짜 칸에 걸치는 일정만 걸러낸다 (YYYY-MM-DD 는 사전순 = 날짜순이라 문자열 비교로 충분)
function getTasksForDate(taskList: TaskProps[], date: Date) {
  const dateKey = toDateKey(date);
  return taskList.filter(
    (task) => task.startDate <= dateKey && dateKey <= task.endDate,
  );
}

// [일정] 달력 본체. 날짜 칸에 일정을 뿌리고 클릭하면 상세를 띄운다.
export default function TaskCalenderBox({
  calendar,
  taskList,
}: TaskCalenderBoxProps & { taskList: TaskProps[] }) {
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const router = useRouter();

  // 상세를 띄우고 조회 시각을 서버에 기록한다 (최근 본 문서 목록에 반영)
  const openTaskDetail = async (task: TaskProps) => {
    setSelectedTask(task);
    const res = await markTaskViewed(task._id);
    if (res.ok) router.refresh();
  };

  return (
    <div className="taskCalenderBox max-w-[100rem] mt-10 m-auto">
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
              className={`min-w-28  min-h-28 pb-4 pl-1 pt-1 ${
                date.isCurrentMonth ? "text-white" : "text-gray-400"
              } border-1 border-white rounded-xl`}
            >
              <div>{date.day}</div>
              <div className="flex flex-col gap-1 mt-1">
                {tasksForDate.map((task) => (
                  <div
                    key={task._id}
                    onClick={() => openTaskDetail(task)}
                    // 최근 본 일정은 테두리로 구분한다
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
