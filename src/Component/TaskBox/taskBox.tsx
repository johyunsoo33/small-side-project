"use client";
import { useState } from "react";
import TaskTopBox from "./taskTopBox/taskTopBox";
import TaskCalenderBox, {
  type CalendarDate,
} from "./taskCalenderBox/taskCalenderBox";
import TaskPopUpBox from "./taskPopUpBox/taskPopUpBox";

export default function TaskBox() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1); // 해당 달의 첫 번째 날짜 객체 생성
  const lastDay = new Date(year, month + 1, 0); // 해당 달의 마지막 날짜 객체 생성 (다음 달의 0번째 날짜는 현재 달의 마지막 날짜)
  const prevLastDay = new Date(year, month, 0); // 이전 달의 마지막 날짜 객체 생성 (현재 달의 0번째 날짜는 이전 달의 마지막 날짜)

  const startDayOfWeek = firstDay.getDay(); // 해당 달의 첫 번째 날짜가 무슨 요일인지
  const totalDays = lastDay.getDate(); // 이달 총 일수
  const prevMonthTotalDays = prevLastDay.getDate(); // 전달 총 일수

  const calendar: CalendarDate[] = [];

  // 이전 달 날짜
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    calendar.push({
      day: prevMonthTotalDays - i,
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  // 현재 달 날짜
  for (let day = 1; day <= totalDays; day++) {
    calendar.push({
      day: day,
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  // 다음 달 날짜
  const remainingCells = 42 - calendar.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendar.push({
      day: day,
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const closePopUp = () => {
    setOpen(false);
  };
  const createTask = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="p-4">
        <TaskTopBox
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          year={year}
          month={month}
          createTask={createTask}
        />
        <TaskCalenderBox calendar={calendar} />
        <div className="taskAddPopUpBox">
          <TaskPopUpBox closePopUpFunction={closePopUp} popUpStatus={open} />
        </div>
      </div>
    </>
  );
}
