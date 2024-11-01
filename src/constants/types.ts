type Todo = {
  id: number;
  name: string;
  checked: boolean;
};

type Filter = 'all' | 'active' | 'completed';

export type { Todo, Filter };
