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
      <ListItemButton aria-label="check" onClick={() => toggleTodo(item)}>
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
  );
};

export default ListUnit;
