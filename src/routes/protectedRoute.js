import express from "express"
import { deleteTodo } from "../controllers/functions/deleteTodo.controller.js";
import { markTodo } from "../controllers/functions/markTodo.controller.js";
import { createTodo } from "../controllers/functions/todo.controller.js";
import { todoList } from "../controllers/functions/todoList.controller.js";

const protectedRoute=express.Router();

protectedRoute.post("/createtodo",createTodo);
protectedRoute.get("/alltodo",todoList);
protectedRoute.post("/marktodo",markTodo);
protectedRoute.post("/deletetodo",deleteTodo);
//https://codesandbox.io/s/hq02m
export default protectedRoute;