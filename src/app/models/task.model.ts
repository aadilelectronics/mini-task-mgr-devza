import { Priority } from '../shared/enums';

// ?-------------------------------------------------------------------------
export interface Task {
  id: number;
  message: string;
  due_date?: string;
  priority?: Priority;
  assigned_to?: number;
  assigned_name?: string;
  created_on?: string;
}

// ?-------------------------------------------------------------------------
export function taskComparator(t1: Task, t2: Task): number {
  const diff = t1.id - t2.id;
  // prettier-ignore
  return (diff > 0) ? 1 : ((diff < 0) ? -1 : 0);
}
