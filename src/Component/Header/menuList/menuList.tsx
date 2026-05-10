import Image from "next/image";
import MenuItem from "../menuItem/menuItem";

export default function MenuList() {
  return (
    <>
      <div className="border-amber-600 border-1">
        <Image src={""} alt="" />
        <ul className="w-fit">
          <MenuItem content="일정"></MenuItem>
          <MenuItem content="메모"></MenuItem>
        </ul>
      </div>
    </>
  );
}
