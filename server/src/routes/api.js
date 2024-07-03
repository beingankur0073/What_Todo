import express from 'express';
import Register from '../controllers/register.controller.js';
import { RegisterSchema } from '../validationSchema/RegisterSchema.js';
import { LoginSchema } from '../validationSchema/LoginSchema.js';
import Login from '../controllers/login.controller.js';
import { createTodo } from '../controllers/todo.controller.js';

import { check } from 'express-validator';
import { GetTodos } from '../controllers/todolist.controllers.js';
import { MarkTodo } from '../controllers/marktodo.contollers.js';
import { RemoveTodo } from '../controllers/removetodo.contorller.js';

const apiRoute=express.Router();
export const apiProtected=express.Router();



apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/login',LoginSchema,Login);

// protected routes
apiProtected.post('/createTodo',[check("desc","Todo desc is required").exists()],createTodo);
apiProtected.get('/todolist',GetTodos);
apiProtected.post('/marktodo',[check("todo_id","Todo_id is required").exists()],MarkTodo);
apiProtected.post('/deletetodo',[check("todo_id","Todo_id is required").exists()],RemoveTodo);
export default apiRoute;