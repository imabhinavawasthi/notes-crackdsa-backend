import express from "express"
import { fetchProblemData } from "../controllers/fetchdata/fetchProblemData.controller.js";
import { fetchProblems } from "../controllers/fetchdata/fetchProblems.contoller.js";
import { deleteTodo } from "../controllers/functions/deleteTodo.controller.js";
import { markTodo } from "../controllers/functions/markTodo.controller.js";
import { createTodo } from "../controllers/functions/todo.controller.js";
import { todoList } from "../controllers/functions/todoList.controller.js";

const protectedRoute=express.Router();

protectedRoute.post("/createtodo",createTodo);
protectedRoute.get("/alltodo",todoList);
protectedRoute.post("/marktodo",markTodo);
protectedRoute.post("/deletetodo",deleteTodo);
protectedRoute.post("/fetchproblems",fetchProblems);
protectedRoute.post("/fetchproblemdata",fetchProblemData);

//https://codesandbox.io/s/hq02m
export default protectedRoute;