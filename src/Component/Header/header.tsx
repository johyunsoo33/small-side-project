import MenuList from "./menuList/menuList";

// [공통] 페이지 상단. 좌측 메뉴를 담는다.
export default function Header() {
  return (
    <>
      <header>
        <MenuList />
      </header>
    </>
  );
}
