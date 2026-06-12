import { calenderAddTask } from "@/src/functions/CalenderTaskAdd";
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
  const handleAddTask = () => {
    // 할 일 추가 로직 구현
  };
  const handleDeleteTask = () => {
    // 할 일 삭제 로직 구현
  };

  return (
    <>
      <div className="taskTopBox flex justify-between max-w-11/12 mt-4 m-auto">
        <div className="taskControl">
          <button onClick={prevMonth} title="이전 달로 이동">
            <Image
              src="/Icons/calender_left_arrow.svg"
              alt="이전 달 이동 아이콘"
              width={32}
              height={32}
            />
          </button>
          <button onClick={nextMonth} title="다음 달로 이동">
            <Image
              src="/Icons/calender_right_arrow.svg"
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
              src="/Icons/calender_add.svg"
              alt="달력에서 할 일 추가"
              width={22}
              height={22}
            />
          </button>
          <button title="할 일 삭제">
            <Image
              src="/Icons/calender_delete.svg"
              alt="달력에서 할 일 삭제"
              width={22}
              height={22}
            />
          </button>
        </div>
      </div>
      {/* 할 일 추가 팝업 창 */}
      <div className="taskAddPopUpBox flex flex-col justify-between max-w-11/12 mt-4 m-auto border-1 border-red-400">
        <header>
          <p>할 일 추가</p>
        </header>
        <main>
          <form action="" className="flex flex-col gap-2">
            <input type="text" placeholder="할 일 제목" />
            <input type="text" placeholder="할 일 내용" />
            <div>
              <input type="date" placeholder="할 일 시작일" />
              <input type="date" placeholder="할 일 마감일" />
            </div>
          </form>
        </main>
        <footer></footer>
      </div>
    </>
  );
}
