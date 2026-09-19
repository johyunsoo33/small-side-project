"use client";
import { useState } from "react";
import TaskTopBox from "./taskTopBox/taskTopBox";
import TaskCalenderBox, {
  type CalendarDate,
  type CalendarView,
} from "./taskCalenderBox/taskCalenderBox";
import TaskPopUpBox from "./taskPopUpBox/taskPopUpBox";
import TaskPopUpDeleteBox from "./taskPopUpBox/taskPopUpDeleteBox";
import { TaskProps } from "@/src/types/addTaskType";

// [일정] 일정 페이지의 최상위 박스. 월 뷰용 6주(42칸)와 주 뷰용 7일을 만들고 팝업들을 묶는다.
export default function TaskBox({ taskList }: { taskList: TaskProps[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>("week");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 주 뷰: currentDate 가 속한 주의 일요일부터 7일
  const weekStart = new Date(
    year,
    month,
    currentDate.getDate() - currentDate.getDay(),
  );
  const week = Array.from(
    { length: 7 },
    (_, i) =>
      new Date(
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate() + i,
      ),
  );

  // 상단 라벨. 주 뷰는 "2026년 9월 3주", 월 뷰는 "2026년 9월"
  const weekOfMonth = Math.ceil(
    (weekStart.getDate() +
      new Date(weekStart.getFullYear(), weekStart.getMonth(), 1).getDay()) /
      7,
  );
  const label =
    view === "week"
      ? `${weekStart.getFullYear()}년 ${weekStart.getMonth() + 1}월 ${weekOfMonth}주`
      : `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0); // 다음 달의 0일 = 이번 달 마지막 날
  const prevLastDay = new Date(year, month, 0); // 이번 달의 0일 = 전달 마지막 날

  const startDayOfWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const prevMonthTotalDays = prevLastDay.getDate();

  const calendar: CalendarDate[] = [];

  // 이전 달 날짜
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthTotalDays - i;
    calendar.push({
      day,
      date: new Date(year, month - 1, day),
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  // 현재 달 날짜
  for (let day = 1; day <= totalDays; day++) {
    calendar.push({
      day,
      date: new Date(year, month, day),
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  // 다음 달 날짜
  const remainingCells = 42 - calendar.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendar.push({
      day,
      date: new Date(year, month + 1, day),
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  // 주 뷰면 7일씩, 월 뷰면 한 달씩 이동
  const goPrev = () => {
    setCurrentDate(
      view === "week"
        ? new Date(year, month, currentDate.getDate() - 7)
        : new Date(year, month - 1, 1),
    );
  };

  const goNext = () => {
    setCurrentDate(
      view === "week"
        ? new Date(year, month, currentDate.getDate() + 7)
        : new Date(year, month + 1, 1),
    );
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const closePopUp = () => {
    setOpen(false);
  };
  const createTask = () => {
    setOpen(true);
  };
  const deleteTask = () => {
    setDeleteOpen(true);
  };
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <TaskTopBox createTask={createTask} deleteTask={deleteTask} />
        <TaskCalenderBox
          view={view}
          onChangeView={setView}
          label={label}
          calendar={calendar}
          week={week}
          taskList={taskList}
          onPrev={goPrev}
          onNext={goNext}
          onToday={goToday}
        />
        <div className="taskAddPopUpBox">
          <TaskPopUpBox closePopUpFunction={closePopUp} popUpStatus={open} />
          <TaskPopUpDeleteBox
            closePopUpFunction={() => setDeleteOpen(false)}
            popUpStatus={deleteOpen}
            taskList={taskList}
          />
        </div>
      </div>
    </>
  );
}
