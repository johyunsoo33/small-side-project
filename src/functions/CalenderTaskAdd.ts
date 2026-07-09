import axios from "axios";
import { TaskProps } from "../types/addTaskType";
import { ApiResPromise } from "../types/api";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTasks() {
  try {
    const res = await axios.get<TaskProps[]>(`${API_URL}/api/tasks/get`);
    return {
      ok: 1,
      message: "일정 목록을 불러왔습니다",
      item: res.data,
    };
  } catch (error) {
    console.log("error", error);
    return { ok: 0, message: "일정 목록을 불러오지 못했습니다" };
  }
}

// export async function calenderAddTask(
//   title: string,
//   content: string,
//   startDate: string,
//   endDate: string,
// ): ApiResPromise<TaskProps[]> {
//   try {
//     const res = await axios.get<TaskProps[]>(`${API_URL}/api/tasks/get`);
//     return {
//       ok: 1,
//       message: "일정 목록을 불러왔습니다",
//       item: res.data,
//     };
//   } catch (error) {
//     console.log("error", error);
//     return { ok: 0, message: "일정 목록을 불러오지 못했습니다" };
//   }
// }
export async function getMemos() {
  try {
    const res = await axios.get<TaskProps[]>(`${API_URL}/api/memos/get`);
    return {
      ok: 1,
      message: "메모 목록을 불러왔습니다",
      item: res.data,
    };
  } catch (error) {
    console.log("error", error);
    return { ok: 0, message: "메모 목록을 불러오지 못했습니다" };
  }
}
