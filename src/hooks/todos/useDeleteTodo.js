import { propEq, reject } from "ramda";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodo = (id) =>
    fetch(`https://api.example.com/todos/${id}`, {
      method: "DELETE",
    });

  return useMutation(deleteTodo, {
    onMutate: (id) => {
      const currentTodos = queryClient.getQueryData("todos") ?? [];
      // @ts-ignore
      queryClient.setQueryData("todos", reject(propEq("id", id), currentTodos));
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
