"use client";

import { useEffect, useState } from "react";
import { X, ListChecks, Trash2 } from "lucide-react";
import { TaskProps } from "@/src/types/addTaskType";
import { deleteTasks } from "@/src/functions/CalenderTaskAdd";
import { useRouter } from "next/navigation";

interface TaskPopUpDeleteProps {
  closePopUpFunction: () => void;
  popUpStatus: boolean;
  selectedDate?: Date;
  taskList: TaskProps[];
}

// 시작일~마감일을 "9월 3일 ~ 9월 5일" 형태로 만든다 (같은 날이면 하나만)
const formatDateRange = (start?: string, end?: string) => {
  if (!start && !end) return null;
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
  if (!start || !end) return fmt((start ?? end)!);
  const sameDay =
    new Date(start).toDateString() === new Date(end).toDateString();
  return sameDay ? fmt(start) : `${fmt(start)} ~ ${fmt(end)}`;
};

// [일정] 일정 삭제 팝업. 목록에서 하나씩 지운다.
export default function TaskPopUpDeleteBox({
  closePopUpFunction,
  popUpStatus,
  selectedDate,
  taskList,
}: TaskPopUpDeleteProps) {
  const date = selectedDate ?? new Date();
  const dateLabel = date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  const [tasks, setTasks] = useState<TaskProps[]>(taskList || []);

  const router = useRouter();
  useEffect(() => {
    setTasks(taskList);
  }, [taskList]);

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
    deleteTasks(id);
  };

  const stopPopUpClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    router.refresh();
  };

  useEffect(() => {
    setTasks(taskList);
    router.refresh();
  }, []);
  return popUpStatus ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 backdrop-blur-sm"
      onClick={closePopUpFunction}
    >
      <div
        className="task-card relative flex max-h-[80vh] w-11/12 max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={stopPopUpClick}
      >
        <div className="relative flex flex-1 flex-col overflow-y-auto p-6">
          <button
            type="button"
            aria-label="닫기"
            onClick={closePopUpFunction}
            className="absolute right-3 top-3 rounded-full p-1.5 text-ink-900/30 transition-all duration-150 hover:bg-ink-900/5 hover:text-clay-500 active:scale-90"
          >
            <X size={18} />
          </button>

          <header className="mb-4 flex items-center gap-2">
            <ListChecks size={16} className="text-clay-500" />
            <p className="text-base font-bold tracking-tight text-ink-900">
              할 일 삭제
            </p>
            <span className="ml-1 rounded-full bg-clay-500/10 px-2.5 py-0.5 text-xs font-medium text-clay-500">
              {dateLabel}
            </span>
          </header>

          {/* 이 날짜의 할 일 목록 */}
          {tasks.length === 0 ? (
            <p className="rounded-lg border border-dashed border-ink-900/10 px-3 py-6 text-center text-xs text-ink-900/35">
              삭제할 할 일이 없어요
            </p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {tasks.map((task) => {
                const rangeLabel = formatDateRange(
                  task.startDate,
                  task.endDate,
                );
                return (
                  <li
                    key={task._id}
                    className="group flex items-start justify-between gap-2 rounded-lg border border-ink-900/8 bg-cream-50 px-3 py-2.5 transition-colors duration-150"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink-900/85">
                        {task.title}
                      </p>
                      {task.content && (
                        <p className="mt-0.5 truncate text-xs text-ink-900/45">
                          {task.content}
                        </p>
                      )}
                      {rangeLabel && (
                        <span className="mt-1 inline-block rounded bg-clay-500/8 px-1.5 py-0.5 text-[10px] font-medium text-clay-500">
                          {rangeLabel}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label={`${task.title} 삭제`}
                      onClick={() => handleDeleteTask(task._id)}
                      className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-ink-900/35 transition-all duration-100 hover:bg-red-50 hover:text-red-500 active:scale-90 active:bg-red-100"
                    >
                      <Trash2 size={13} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="flex justify-end border-t border-ink-900/6 bg-white px-6 py-4">
          <button
            type="button"
            onClick={closePopUpFunction}
            className="rounded-lg px-4 py-2 text-sm text-ink-900/50 transition-all duration-150 hover:bg-ink-900/5 active:scale-95"
          >
            닫기
          </button>
        </footer>
      </div>

      <style jsx>{`
        @keyframes ticketIn {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .task-card {
          animation: ticketIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  ) : null;
}
