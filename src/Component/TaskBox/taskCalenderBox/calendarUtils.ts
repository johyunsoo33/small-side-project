import { TaskProps } from "@/src/types/addTaskType";

export const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// Date 를 "YYYY-MM-DD" 로 변환
export function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// 해당 날짜 칸에 걸치는 일정만 걸러낸다 (YYYY-MM-DD 는 사전순 = 날짜순이라 문자열 비교로 충분)
export function getTasksForDate(taskList: TaskProps[], date: Date) {
  const dateKey = toDateKey(date);
  return taskList.filter(
    (task) => task.startDate <= dateKey && dateKey <= task.endDate,
  );
}

// 일정 카드 색. 북마크는 honey, 최근 본 것은 sage, 나머지는 clay
export function toneClasses(task: TaskProps) {
  if (task.isBookMarked) return { card: "bg-honey-100", bar: "bg-honey-500" };
  if (task.isRecent) return { card: "bg-sage-100", bar: "bg-sage-500" };
  return { card: "bg-clay-100", bar: "bg-clay-500" };
}

// 여러 날에 걸친 일정이면 "9/15 ~ 9/17", 하루짜리면 null (카드에서 날짜를 빼기로 해서 지금은 미사용)
// export function formatRange(task: TaskProps) {
//   if (task.startDate === task.endDate) return null;
//   const short = (key: string) => {
//     const [, m, d] = key.split("-");
//     return `${Number(m)}/${Number(d)}`;
//   };
//   return `${short(task.startDate)} ~ ${short(task.endDate)}`;
// }
