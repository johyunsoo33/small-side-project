"use client";

import { TaskProps } from "@/src/types/addTaskType";
import useRecentMemoStore from "@/src/Hook/useHistoryHook";

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
  const addRecent = useRecentMemoStore(
    (state: { addRecent: (id: string) => void }) => state.addRecent,
  );

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
                    onClick={() => addRecent(task._id)}
                    className="truncate rounded bg-[#4F5DFF] px-1 text-xs text-white min-w-8/10 max-w-9/10 mx-auto cursor-pointer"
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
    </div>
  );
}
