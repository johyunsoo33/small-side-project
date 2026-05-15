"use client";
import { useState } from "react";

export default async function MySchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);

  const startDayOfWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const prevMonthTotalDays = prevLastDay.getDate();

  const calendar = [];

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
        <div className="taskTopBox">
          <div className="taskControl">
            <button onClick={prevMonth}>이전</button>
            <span>
              {year}년 {month + 1}월
            </span>
            <button onClick={nextMonth}>다음</button>
          </div>
          <div className="taskAdd">
            <button>+</button>
            <button>삭제</button>
          </div>
        </div>
        <div className="taskCalenderBox">
          <div className="taskCalender grid grid-cols-7 gap-2">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <div key={day} className="font-bold text-white text-center">
                {day}
              </div>
            ))}

            {calendar.map((date, index) => (
              <div
                key={index}
                className={`p-2 ${date.isCurrentMonth ? "text-white" : "text-gray-400"}`}
              >
                {date.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
