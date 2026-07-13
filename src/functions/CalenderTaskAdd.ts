import axios from "axios";
import { TaskProps } from "../types/addTaskType";
import { ApiRes, ApiResPromise } from "../types/api";
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

export async function calenderAddTask(
  state: ApiRes<TaskProps> | null,
  formData: FormData,
): ApiResPromise<TaskProps> {
  try {
    const res = await axios.post<TaskProps>(`${API_URL}/api/tasks/post`, {
      param: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
      },
    });
    console.log("res", res);
    return {
      ok: 1,
      message: "일정을 생성 하였습니다",
      item: res.data,
    };
  } catch (error) {
    console.log("error", error);
    return { ok: 0, message: "일정을 생성하는데 실패 하였습니다" };
  }
}

export async function deleteTasks(id: string): ApiResPromise<TaskProps> {
  try {
    const res = await axios.delete<TaskProps>(
      `${API_URL}/api/tasks/delete/${id}`,
    );
    return {
      ok: 1,
      message: "일정을 삭제하였습니다",
      item: res.data,
    };
  } catch (error) {
    console.log("error", error);
    return { ok: 0, message: "일정을 삭제하는데 실패하였습니다" };
  }
}

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
