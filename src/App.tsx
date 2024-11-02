import { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
} from '@mui/material';
import {
  RadioButtonUnchecked,
  CheckCircleOutline,
  DeleteForever,
} from '@mui/icons-material';
import { Todo, Filter, FILTERS_MAP, FILTERS } from './constants';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(FILTERS.All);

  const toggleTodo = (todoSelected: Todo) =>
    setTodos(
      todos.map(todo =>
        todo.id === todoSelected.id
          ? { ...todo, checked: !todo.checked }
          : todo,
      ),
    );

  const handleDelete = (todoRemove: Todo) =>
    setTodos(todos.filter(todo => todo.id !== todoRemove.id));

  const handleAll = () => setFilter(FILTERS.All);
  const handleActive = () => setFilter(FILTERS.Active);
  const handleCompleted = () => setFilter(FILTERS.Completed);
  const handleClear = () => setTodos(todos.filter(todo => !todo.checked));

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('input') as HTMLInputElement;
    const name = input.value;

    if (!name) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        name,
        checked: false,
      },
    ]);

    input.value = '';
  };

  return (
    <main style={{ textAlign: 'center', padding: 20 }}>
      <Typography
        variant="h2"
        sx={{ color: '#eedfdf', fontWeight: 100, marginBottom: 3 }}
      >
        todos
      </Typography>
      <Box
        sx={{
          backgroundColor: '#fefefe',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          padding: '10px 20px',
          borderRadius: 1,
        }}
      >
        <List
          sx={{
            position: 'relative',
            overflow: 'auto',
            maxHeight: '70vh',
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <ListSubheader
            sx={{ display: 'flex', alignItems: 'flex-end' }}
            component="form"
            onSubmit={handleAdd}
          >
            <TextField
              id="input"
              label="What needs to be done?"
              variant="standard"
              autoComplete="off"
              fullWidth
            />
          </ListSubheader>
          {todos.filter(FILTERS_MAP[filter]).map(item => (
            <ListItem
              disablePadding
              key={item.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(item)}
                >
                  <DeleteForever color="error" />
                </IconButton>
              }
            >
              <ListItemButton
                aria-label="check"
                onClick={() => toggleTodo(item)}
              >
                <ListItemIcon>
                  {item.checked ? (
                    <CheckCircleOutline sx={{ color: '#86bdaf' }} />
                  ) : (
                    <RadioButtonUnchecked color="disabled" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    color: item.checked ? 'gray' : '#000',
                    textDecoration: item.checked ? 'line-through' : 'none',
                    textDecorationColor: 'gray',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
            {todos.filter(FILTERS_MAP[FILTERS.Active]).length} items left
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
      </Box>
    </main>
  );
}

export default App;
