import axios from "axios";
import { MemoProps, TaskProps } from "../types/addTaskType";
import { ApiRes, ApiResPromise } from "../types/api";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 달력

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

// 메모

export async function getMemos() {
  try {
    const res = await axios.get<MemoProps[]>(`${API_URL}/api/memos/get`);
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

export async function AddMemo(
  state: ApiRes<MemoProps> | null,
  formData: FormData,
): ApiResPromise<MemoProps> {
  try {
    const uploadData = new FormData();
    uploadData.append(
      "param",
      JSON.stringify({
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
      }),
    );
    const attachment = formData.get("attachment") as File | null;
    if (attachment && attachment.size > 0) {
      uploadData.append("attachment", attachment);
    }

    const res = await axios.post<MemoProps>(
      `${API_URL}/api/memos/post`,
      uploadData,
    );
    console.log("res", res);
    return {
      ok: 1,
      message: "메모를 생성 하였습니다",
      item: res.data,
    };
  } catch (error) {
    console.log("error", error);
    return { ok: 0, message: "메모를 생성하는데 실패 하였습니다" };
  }
}

// 최근 본 문서
// 최근 목록은 getTasks / getMemos 결과에서 골라내므로 전용 조회 함수가 필요 없다.
//
// 참고: 서버에 (type, _id) 목록을 보내 조회하던 버전.
//
// export async function getRecentDocs(refs: RecentRef[]) {
//   if (refs.length === 0) {
//     return { ok: 1, message: "최근 본 문서가 없습니다", item: [] as RecentDoc[] };
//   }
//   try {
//     const res = await axios.post<RecentDoc[]>(`${API_URL}/api/recent/post`, {
//       param: refs,
//     });
//     return {
//       ok: 1,
//       message: "최근 본 문서를 불러왔습니다",
//       item: res.data,
//     };
//   } catch (error) {
//     console.log("error", error);
//     return { ok: 0, message: "최근 본 문서를 불러오지 못했습니다" };
//   }
// }

export async function deleteMemo(id: string): ApiResPromise<MemoProps> {
  try {
    const res = await axios.delete<MemoProps>(
      `${API_URL}/api/memos/delete/${id}`,
    );
    return {
      ok: 1,
      message: "메모를 삭제하였습니다",
      item: res.data,
    };
  } catch (error) {
    console.log("error", error);
    return { ok: 0, message: "메모를 삭제하는데 실패하였습니다" };
  }
}
