import { useState } from 'react';
import { Typography, Box, TextField, List, ListSubheader } from '@mui/material';
import { Todo, Filter, FILTERS } from './constants';
import { FooterButtons, ListUnit } from './components';
import { filterTodos } from './services';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(FILTERS.All);

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
        variant="h1"
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
          }}
          subheader={<li />}
        >
          <ListSubheader
            sx={{ display: 'flex', alignItems: 'flex-end' }}
            component="form"
            onSubmit={handleAdd}
          >
            <TextField
              sx={{
                '.MuiInputBase-input': { fontSize: '1.5rem', color: '#747474' },
                '.MuiInputLabel-root': { fontSize: '1.5rem' },
              }}
              id="input"
              label="What needs to be done?"
              variant="standard"
              autoComplete="off"
              fullWidth
            />
          </ListSubheader>
          {todos.filter(filterTodos[filter]).map(item => (
            <ListUnit
              key={item.id}
              item={item}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
        </List>
        {todos.length > 0 && (
          <FooterButtons
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            setTodos={setTodos}
          />
        )}
      </Box>
    </main>
  );
}

export default App;
