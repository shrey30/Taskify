const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(express.json());
function checkuser(req, res, next) {
  const { username, password } = req.body;

  if (username === "shrey@mail.com" && password === "123") {
    next();
  } else {
    res.json({ message: "Unauthorized" });
  }
}

function sendResponse(req, res) {
  res.json({
    success: true,
    message: "Authorized",
  });
}

function add(req, res, next) {
  let todos = [];
  const todoObjects = fs.readFileSync("todos.json", "utf-8");

  if (todoObjects) {
    todos = JSON.parse(todoObjects);
  }

  const newTodo = { id: todos.length, todo: req.body.task };
  todos.push(newTodo);

  fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2), "utf-8");
  res.json({
    status: true,
    message: "Todo added!",
  });
}

function fetchTodosFromFile(req, res) {
  const todoObjects = fs.readFileSync("todos.json", "utf-8");
  const todos = todoObjects ? JSON.parse(todoObjects) : [];
  const formattedTodos = todos.map((todo) => ({
    id: todo.id,
    task: todo.todo,
  }));
  res.json(formattedTodos);
}

app.get("/todos", fetchTodosFromFile);
app.post("/add", add);
app.post("/", checkuser, sendResponse);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
