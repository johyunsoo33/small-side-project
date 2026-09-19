import { TaskProps } from "@/src/types/addTaskType";
import type { CalendarDate } from "./taskCalenderBox";
import {
  WEEKDAYS,
  toDateKey,
  getTasksForDate,
  toneClasses,
} from "./calendarUtils";

interface MonthGridProps {
  calendar: CalendarDate[];
  taskList: TaskProps[];
  todayKey: string;
  onOpenTask: (task: TaskProps) => void;
}

// 한 칸에 보여줄 최대 일정 수. 넘치면 "+N" 으로 접는다
const MAX_VISIBLE_TASKS = 3;

// [일정] 월 뷰. 6주 42칸에 일정을 작은 칩으로 뿌린다.
export default function MonthGrid({
  calendar,
  taskList,
  todayKey,
  onOpenTask,
}: MonthGridProps) {
  return (
    <>
      <div className="grid grid-cols-7 text-center text-sm text-ink-600/60">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-7 gap-2">
        {calendar.map((date, index) => {
          const tasksForDate = getTasksForDate(taskList, date.date);
          const isToday = toDateKey(date.date) === todayKey;
          const hiddenCount = tasksForDate.length - MAX_VISIBLE_TASKS;

          return (
            <div
              key={index}
              className={`min-h-28 rounded-xl p-2 transition-colors ${
                date.isCurrentMonth ? "hover:bg-cream-50" : "opacity-40"
              }`}
            >
              <span
                className={
                  isToday
                    ? "flex h-9 w-9 items-center justify-center rounded-lg bg-clay-500 font-bold text-white"
                    : "flex h-9 w-9 items-center justify-center text-ink-900"
                }
              >
                {date.day}
              </span>

              <div className="mt-1 flex flex-col gap-1">
                {tasksForDate.slice(0, MAX_VISIBLE_TASKS).map((task) => {
                  const tone = toneClasses(task);
                  return (
                    <button
                      key={task._id}
                      type="button"
                      onClick={() => onOpenTask(task)}
                      title={task.title}
                      className={`flex items-center gap-1.5 truncate rounded-md px-2 py-1 text-left text-xs text-ink-900 ${tone.card}`}
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${tone.bar}`} />
                      <span className="truncate">{task.title}</span>
                    </button>
                  );
                })}
                {hiddenCount > 0 && (
                  <span className="px-2 text-xs text-ink-600">
                    +{hiddenCount}개
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
