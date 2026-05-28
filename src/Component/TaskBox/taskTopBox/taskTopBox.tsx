import Image from "next/image";

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
        <button onClick={prevMonth} title="이전 달로 이동">
          <Image
            src="/icons/calender_left_arrow.svg"
            alt="이전 달 이동 아이콘"
            width={32}
            height={32}
          />
        </button>
        <button onClick={nextMonth} title="다음 달로 이동">
          <Image
            src="/icons/calender_right_arrow.svg"
            alt="다음 달 이동 아이콘"
            width={32}
            height={32}
          />
        </button>
      </div>
      <span>
        {year}년 {month + 1}월
      </span>
      <div className="taskAdd">
        <button className="mr-2" title="할 일 추가">
          <Image
            src="/icons/calender_add.svg"
            alt="달력에서 할일 추가"
            width={22}
            height={22}
          />
        </button>
        <button title="할 일 삭제">
          <Image
            src="/icons/calender_delete.svg"
            alt="달력에서 할일 제게"
            width={22}
            height={2}
          />
        </button>
      </div>
    </div>
  );
}
