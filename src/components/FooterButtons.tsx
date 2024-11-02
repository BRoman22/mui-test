import { Typography, Box, Button } from '@mui/material';
import { Todo, Filter, FILTERS } from '../constants';
import { filterTodos } from '../services';
import { useCallback } from 'react';

interface Props {
  todos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  setTodos: (todos: Todo[]) => void;
}

const FooterButtons = ({ todos, filter, setFilter, setTodos }: Props) => {
  const handleAll = useCallback(() => setFilter(FILTERS.All), [setFilter]);
  const handleActive = useCallback(
    () => setFilter(FILTERS.Active),
    [setFilter],
  );
  const handleCompleted = useCallback(
    () => setFilter(FILTERS.Completed),
    [setFilter],
  );
  const handleClear = () => setTodos(todos.filter(todo => !todo.checked));

  return (
    <Box
      aria-label="buttons panel"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ '& button': { m: 1 } }}
    >
      <Typography
        variant="subtitle1"
        component="span"
        sx={{ color: '#919191' }}
      >
        {todos.filter(filterTodos[FILTERS.Active]).length} items left
      </Typography>
      <Box>
        <Button
          variant={filter === FILTERS.All ? 'contained' : 'outlined'}
          onClick={handleAll}
          sx={{ textTransform: 'none' }}
        >
          All
        </Button>
        <Button
          variant={filter === FILTERS.Active ? 'contained' : 'outlined'}
          onClick={handleActive}
          disabled={todos.every(t => t.checked)}
          sx={{ textTransform: 'none' }}
        >
          Active
        </Button>
        <Button
          variant={filter === FILTERS.Completed ? 'contained' : 'outlined'}
          onClick={handleCompleted}
          disabled={todos.every(t => !t.checked)}
          sx={{ textTransform: 'none' }}
        >
          Completed
        </Button>
      </Box>
      <Button
        variant="outlined"
        color="error"
        onClick={handleClear}
        disabled={todos.every(t => !t.checked)}
        sx={{ textTransform: 'none' }}
      >
        Clear completed
      </Button>
    </Box>
  );
};

export default FooterButtons;
