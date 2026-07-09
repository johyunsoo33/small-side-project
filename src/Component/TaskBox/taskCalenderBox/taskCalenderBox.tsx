import { TaskProps } from "@/src/types/addTaskType";

export interface CalendarDate {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
}

interface TaskCalenderBoxProps {
  calendar: CalendarDate[];
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

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
                    className="truncate rounded bg-[#4F5DFF] px-1 text-xs text-white"
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
