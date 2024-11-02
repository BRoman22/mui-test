import type { Filter, Todo } from '../constants';

export const filterTodos: Record<Filter, (todo: Todo) => boolean> = {
  all: () => true,
  active: todo => !todo.checked,
  completed: todo => todo.checked,
};
