export enum TaskStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  dueDate?: string;
  status: TaskStatus;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
}
