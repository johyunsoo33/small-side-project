import Image from "next/image";

export default function MemoTopBox() {
  return (
    <div className="taskTopBox flex justify-between max-w-11/12 mt-4 m-auto">
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
  );
}
