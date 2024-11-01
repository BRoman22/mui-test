import type { Filter, Todo } from './types';
export type * from './types';

export const FILTERS_MAP: Record<Filter, (todo: Todo) => boolean> = {
  all: () => true,
  active: todo => !todo.checked,
  completed: todo => todo.checked,
};

export enum FILTERS {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
