import { useQuery } from "react-query";

export const useListTodos = () => {
  const fetchTodos = () =>
    fetch("https://api.example.com/todos")
      .then((res) => res.json())
      .then((jsonResponse) => jsonResponse.todos);

  return useQuery("todos", fetchTodos);
};
