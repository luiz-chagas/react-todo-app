import { useMutation, useQueryClient } from "react-query";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  const createTodo = (todo) =>
    fetch("https://api.example.com/todos", {
      method: "POST",
      body: JSON.stringify(todo),
    });

  return useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};
