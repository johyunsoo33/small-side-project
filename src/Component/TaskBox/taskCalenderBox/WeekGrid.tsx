import { TaskProps } from "@/src/types/addTaskType";
import {
  WEEKDAYS,
  toDateKey,
  getTasksForDate,
  toneClasses,
} from "./calendarUtils";

interface WeekGridProps {
  days: Date[];
  taskList: TaskProps[];
  todayKey: string;
  onOpenTask: (task: TaskProps) => void;
}

// [일정] 주 뷰. 7일을 열로 세우고 각 날의 일정을 카드로 쌓는다.
export default function WeekGrid({
  days,
  taskList,
  todayKey,
  onOpenTask,
}: WeekGridProps) {
  return (
    <div className="grid min-h-72 grid-cols-7 gap-3">
      {days.map((date) => {
        const key = toDateKey(date);
        const tasks = getTasksForDate(taskList, date);

        return (
          <div key={key}>
            <div className="border-b border-cream-200 pb-3 text-center">
              <div className="text-sm text-ink-600/60">
                {WEEKDAYS[date.getDay()]}
              </div>
              <div
                className={`mt-1 text-xl font-bold ${
                  key === todayKey ? "text-clay-500" : "text-ink-900"
                }`}
              >
                {date.getDate()}
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-3">
              {tasks.map((task) => {
                const tone = toneClasses(task);
                return (
                  <button
                    key={task._id}
                    type="button"
                    onClick={() => onOpenTask(task)}
                    title={task.title}
                    className={`rounded-lg p-3 text-left transition-transform hover:-translate-y-0.5 ${tone.card}`}
                  >
                    <span className={`block h-1.5 w-7 rounded-full ${tone.bar}`} />
                    <div className="mt-2 text-sm font-semibold text-ink-900">
                      {task.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
