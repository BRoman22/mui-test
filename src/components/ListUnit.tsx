import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  RadioButtonUnchecked,
  CheckCircleOutline,
  DeleteForever,
} from '@mui/icons-material';
import { Todo } from '../constants';

interface Props {
  item: Todo;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const ListUnit = ({ item, todos, setTodos }: Props) => {
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

  return (
    <ListItem
      disablePadding
      sx={{ '&:hover .MuiIconButton-root': { display: 'flex' } }}
      secondaryAction={
        <IconButton
          sx={{ display: 'none' }}
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete(item)}
        >
          <DeleteForever color="error" />
        </IconButton>
      }
    >
      <ListItemButton aria-label="check" onClick={() => toggleTodo(item)}>
        <ListItemIcon>
          {item.checked ? (
            <CheckCircleOutline
              sx={{ color: '#86bdaf', width: '2rem', height: '2rem' }}
            />
          ) : (
            <RadioButtonUnchecked
              sx={{ color: '#f3f3f3', width: '2rem', height: '2rem' }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          primaryTypographyProps={{
            fontSize: '1.5rem',
          }}
          sx={{
            color: item.checked ? '#d9d9d9' : '#747474',
            textDecoration: item.checked ? 'line-through' : 'none',
            textDecorationColor: '#d9d9d9',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            transition: 'all 0.4s',
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default ListUnit;
