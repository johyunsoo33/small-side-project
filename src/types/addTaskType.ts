export interface addTaskProps {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface TaskProps extends addTaskProps {
  _id: string;
}
