export interface addTaskProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface TaskProps extends addTaskProps {
  _id: string;
}
export interface addMemoProps {
  imgSrc?: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface MemoProps extends addMemoProps {
  _id: string;
}
