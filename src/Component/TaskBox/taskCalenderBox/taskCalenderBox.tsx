"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TaskProps } from "@/src/types/addTaskType";
import { markTaskViewed } from "@/src/functions/CalenderTaskAdd";
import TaskDetail from "../TaskDetailBox/TaskDetailBox";
import MonthGrid from "./MonthGrid";
import WeekGrid from "./WeekGrid";
import { toDateKey } from "./calendarUtils";

export interface CalendarDate {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
}

export type CalendarView = "week" | "month";

interface TaskCalenderBoxProps {
  view: CalendarView;
  onChangeView: (view: CalendarView) => void;
  label: string;
  calendar: CalendarDate[];
  week: Date[];
  taskList: TaskProps[];
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const VIEWS: { key: CalendarView; label: string }[] = [
  { key: "week", label: "주" },
  { key: "month", label: "월" },
];

// [일정] 달력 카드. 상단바에서 주/월을 고르고, 아래에 해당 뷰를 그린다.
export default function TaskCalenderBox({
  view,
  onChangeView,
  label,
  calendar,
  week,
  taskList,
  onPrev,
  onNext,
  onToday,
}: TaskCalenderBoxProps) {
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const router = useRouter();
  const todayKey = toDateKey(new Date());

  // 상세를 띄우고 조회 시각을 서버에 기록한다 (최근 본 문서 목록에 반영)
  const openTaskDetail = async (task: TaskProps) => {
    setSelectedTask(task);
    const res = await markTaskViewed(task._id);
    if (res.ok) router.refresh();
  };

  const navButton =
    "flex h-9 w-9 items-center justify-center rounded-full border border-cream-200 bg-white text-ink-600 transition-colors hover:bg-cream-100 hover:text-ink-900";

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-[0_20px_60px_-30px_rgba(120,80,40,0.25)]">
      <div className="flex items-center justify-between border-b border-cream-200 bg-cream-50 px-6 py-4">
        <div className="flex gap-2">
          {VIEWS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onChangeView(item.key)}
              className={
                view === item.key
                  ? "flex h-11 w-11 items-center justify-center rounded-full bg-sage-500 text-white"
                  : "flex h-11 w-11 items-center justify-center rounded-full border border-cream-200 bg-white text-ink-600 transition-colors hover:bg-cream-100"
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-ink-600">{label}</span>
          <button
            type="button"
            onClick={onToday}
            className="rounded-full border border-cream-200 bg-white px-3 py-1.5 text-sm text-ink-600 transition-colors hover:bg-cream-100 hover:text-ink-900"
          >
            오늘
          </button>
          <button type="button" onClick={onPrev} title="이전" className={navButton}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={onNext} title="다음" className={navButton}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="px-6 py-6">
        {view === "week" ? (
          <WeekGrid
            days={week}
            taskList={taskList}
            todayKey={todayKey}
            onOpenTask={openTaskDetail}
          />
        ) : (
          <MonthGrid
            calendar={calendar}
            taskList={taskList}
            todayKey={todayKey}
            onOpenTask={openTaskDetail}
          />
        )}
      </div>

      <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
    </div>
  );
}
