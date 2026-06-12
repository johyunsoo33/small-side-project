import axios from "axios";
import { addTaskProps } from "../types/addTaskType";
import { ApiResPromise } from "../types/api";

export async function calenderAddTask(
  title: string,
  content: string,
  startTime: string,
  endTime: string,
): ApiResPromise<addTaskProps> {
  let res: Response;
  try {
    // res = await axios.get();
    // return { ok: 1, message: "북마크 목록을 불러왔습니다", item: res.data };
    return null as any;
  } catch (error) {
    console.log("error", error);
    return { ok: 0, message: "북마크 목록을 불러오지 못했습니다" };
  }
}
