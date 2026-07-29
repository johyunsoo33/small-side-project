import Header from "@/src/Component/Header/header";
import MemoBox from "@/src/Component/MemoBox/MemoBox";
import { getMemos } from "@/src/functions/CalenderTaskAdd";

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
