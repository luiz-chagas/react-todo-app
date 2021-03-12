import { useMutation, useQueryClient } from "react-query";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodo = (id) =>
    fetch(`https://api.example.com/todos/${id}`, {
      method: "DELETE",
    });

  return useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};
