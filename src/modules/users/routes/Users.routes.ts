import { Router } from "express";
import UsersController from "@modules/users/controllers/Users.controller";
import checkNewUserForm from "@middlewares/checkNewUserForm";
import checkLoginUserForm from "@shared/http/middlewares/checkLoginUserForm";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const usersRouter = Router();

usersRouter.get("/list/all", isAuthenticated, UsersController.listAll);
usersRouter.post("/list/one", isAuthenticated, UsersController.listOne);
usersRouter.delete("/:id", isAuthenticated, UsersController.deleteUser);
usersRouter.put("/:id", isAuthenticated, UsersController.editUser);
usersRouter.post("/signup", checkNewUserForm, UsersController.createUser);
usersRouter.post("/login", checkLoginUserForm, UsersController.createUserSession);

export default usersRouter;
