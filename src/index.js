import "./styles.css";
import "./services/api";
import React from "react";
import ReactDOM from "react-dom";
import { Layout } from "./components/Layout";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const TodoApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <AddTodo />
        <TodoList />
      </Layout>
    </QueryClientProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<TodoApp />, rootElement);
