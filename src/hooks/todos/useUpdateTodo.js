import { map, mergeLeft, mergeRight, propEq, when } from "ramda";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const updateTodo = (todo) =>
    fetch(`https://api.example.com/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });

  return useMutation(updateTodo, {
    onMutate: (todo) => {
      const currentTodos = queryClient.getQueryData("todos") ?? [];
      // @ts-ignore
      queryClient.setQueryData(
        "todos",
        // @ts-ignore
        map(when(propEq("id", todo.id), mergeLeft(todo)), currentTodos)
      );

      return currentTodos;
    },
    onError: (error, todo, context) => {
      queryClient.setQueryData("todos", context);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};
