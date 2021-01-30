import { EntityMetadataMap } from '@ngrx/data';
import { Task, taskComparator } from '../models/task.model';
import { User, userComparator } from '../models/user.model';

// ?-------------------------------------------------------------------------
export const entityMetadataMap: EntityMetadataMap = {
  Users: {
    sortComparer: userComparator,
    selectId: (user: User) => user.id
  },
  Tasks: {
    sortComparer: taskComparator,
    selectId: (task: Task) => task.id
  }
};
