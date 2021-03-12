import { useMutation, useQueryClient } from "react-query";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const updateTodo = (todo) =>
    fetch(`https://api.example.com/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });

  return useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};
