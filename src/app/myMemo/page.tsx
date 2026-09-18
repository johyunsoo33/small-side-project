import Header from "@/src/Component/Header/header";
import MemoBox from "@/src/Component/MemoBox/MemoBox";
import { getMemos } from "@/src/functions/CalenderTaskAdd";

// [페이지] 메모 (/myMemo) - 서버에서 메모 목록을 받아 넘긴다
export default async function MyMemo() {
  const data = await getMemos();
  const memoList = data.ok ? (data.item ?? []) : [];

  return (
    <>
      <Header />
      <MemoBox memoList={memoList} />
    </>
  );
}
