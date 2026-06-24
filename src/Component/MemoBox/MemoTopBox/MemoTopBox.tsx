import Image from "next/image";

export default function MemoTopBox() {
  const createMemo = () => {};

  return (
    <div className="taskTopBox relative max-w-11/12 mt-10 ">
      <div className="taskAdd absolute right-4">
        <button className="mr-2" title="할 일 추가">
          <Image
            src="/Icons/calender_add.svg"
            alt="달력에서 할 일 추가"
            width={22}
            height={22}
          />
        </button>
      </div>
    </div>
  );
}
