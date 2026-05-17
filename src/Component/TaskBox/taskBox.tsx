"use client";
import { useState } from "react";
import TaskTopBox from "./taskTopBox/taskTopBox";
import TaskCalenderBox, {
  type CalendarDate,
} from "./taskCalenderBox/taskCalenderBox";

export default function TaskBox() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const startDayOfWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const prevMonthTotalDays = prevLastDay.getDate();

  const calendar: CalendarDate[] = [];

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

  return (
    <>
      <div>
        <TaskTopBox
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          year={year}
          month={month}
        />
        <TaskCalenderBox calendar={calendar} />
      </div>
    </>
  );
}
