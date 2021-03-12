import React from "react";
import { List, Paper } from "@material-ui/core";
import { TodoListItem } from "./TodoListItem";
import { useListTodos } from "../hooks/todos";
import { isEmpty } from "ramda";

export const TodoList = () => {
  const { data = [] } = useListTodos();

  if (isEmpty(data)) {
    return null;
  }

  return (
    <>
      <Paper style={{ margin: 16 }}>
        <List style={{ overflow: "scroll" }}>
          {data.map((todo, idx) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              divider={idx !== data.length - 1}
            />
          ))}
        </List>
      </Paper>
    </>
  );
};
