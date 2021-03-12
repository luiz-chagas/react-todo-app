import { append } from "ramda";
import { useMutation, useQueryClient } from "react-query";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodo = (todo) =>
    fetch("https://api.example.com/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    });

  return useMutation(createTodo, {
    onMutate: (todo) => {
      const currentTodos = queryClient.getQueryData("todos") ?? [];
      // @ts-ignore
      queryClient.setQueryData("todos", append(todo, currentTodos));
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
