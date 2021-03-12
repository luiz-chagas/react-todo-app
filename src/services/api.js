import { setupWorker, rest } from "msw";
import { reject, propEq, map, when, mergeLeft, find } from "ramda";

// Our mock database
let todos = [];
let id = 1;

// 2. Define request handlers and response resolvers.
const worker = setupWorker(
  rest.get("https://api.example.com/todos", (req, res, ctx) => {
    return res(
      ctx.delay(1500),
      ctx.json({
        todos,
      })
    );
  }),
  rest.post("https://api.example.com/todos", (req, res, ctx) => {
    const todoObject = Object.assign(
      {
        id: id++,
        text: "",
        completed: false,
      },
      JSON.parse(req.body)
    );
    todos.push(todoObject);

    return res(
      ctx.delay(1500),
      ctx.json({
        todo: todoObject,
      })
    );
  }),
  rest.delete("https://api.example.com/todos/:id", (req, res, ctx) => {
    todos = reject(propEq("id", Number(req.params.id)))(todos);

    return res(ctx.delay(1500), ctx.status(200));
  }),
  rest.put("https://api.example.com/todos/:id", (req, res, ctx) => {
    todos = map(
      when(propEq("id", Number(req.params.id)), mergeLeft(JSON.parse(req.body)))
    )(todos);

    const newTodo = find(propEq("id", Number(req.params.id)))(todos);

    return res(
      ctx.delay(1500),
      ctx.json({
        todo: newTodo,
      })
    );
  })
);

// 3. Start the Service Worker.
worker.start();
