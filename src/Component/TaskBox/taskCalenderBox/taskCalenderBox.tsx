export interface CalendarDate {
  day: number;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
}

interface TaskCalenderBoxProps {
  calendar: CalendarDate[];
}

export default function TaskCalenderBox({ calendar }: TaskCalenderBoxProps) {
  return (
    <div className="taskCalenderBox max-w-11/12 mt-10 m-auto">
      <div className="taskCalender grid grid-cols-7 gap-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="font-bold text-white text-center">
            {day}
          </div>
        ))}

        {calendar.map((date, index) => (
          <div
            key={index}
            className={`pb-4 pl-1 pt-1 ${
              date.isCurrentMonth ? "text-white" : "text-gray-400"
            } border-1 border-white rounded-xl`}
          >
            {date.day}
          </div>
        ))}
      </div>
    </div>
  );
}
