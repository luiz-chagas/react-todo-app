import React from "react";
import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { useDeleteTodo, useUpdateTodo } from "../hooks/todos";

export const TodoListItem = ({ todo, divider }) => {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const onDelete = () => {
    deleteTodo(todo.id);
  };

  const onToggle = () => {
    updateTodo({ id: todo.id, completed: !todo.completed });
  };

  return (
    <ListItem divider={divider}>
      <Checkbox checked={todo.completed} onChange={onToggle} />
      <ListItemText primary={todo.text} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={onDelete}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
