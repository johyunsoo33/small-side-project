interface TaskTopBoxProps {
  prevMonth: () => void;
  nextMonth: () => void;
  year: number;
  month: number;
}

export default function TaskTopBox({
  prevMonth,
  nextMonth,
  year,
  month,
}: TaskTopBoxProps) {
  return (
    <div className="taskTopBox flex justify-between max-w-11/12 mt-4 m-auto">
      <div className="taskControl">
        <button onClick={prevMonth}>이전</button>
        <button onClick={nextMonth}>다음</button>
      </div>
      <span>
        {year}년 {month + 1}월
      </span>
      <div className="taskAdd">
        <button className="mr-2">추가</button>
        <button>삭제</button>
      </div>
    </div>
  );
}
