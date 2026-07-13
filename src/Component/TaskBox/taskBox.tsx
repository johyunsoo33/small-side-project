"use client";
import { useEffect, useState } from "react";
import TaskTopBox from "./taskTopBox/taskTopBox";
import TaskCalenderBox, {
  type CalendarDate,
} from "./taskCalenderBox/taskCalenderBox";
import TaskPopUpBox from "./taskPopUpBox/taskPopUpBox";
import TaskPopUpDeleteBox from "./taskPopUpBox/taskPopUpDeleteBox";
import { TaskProps } from "@/src/types/addTaskType";

export default function TaskBox({ taskList }: { taskList: TaskProps[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
  const deleteTask = () => {
    setDeleteOpen(true);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="p-4">
        <TaskTopBox
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          year={year}
          month={month}
          createTask={createTask}
          deleteTask={deleteTask}
        />
        <TaskCalenderBox calendar={calendar} taskList={taskList} />
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
