import { Router } from "express";
import StudentsRepository from "@modules/students/controllers/Students.controller";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import checkNewStudentForm from "@shared/http/middlewares/checkNewStudentForm";

const studentsRouter = Router();

studentsRouter.post(
  "/register",
  isAuthenticated,
  checkNewStudentForm,
  StudentsRepository.createStudent,
);

studentsRouter.get("/list/all", isAuthenticated, StudentsRepository.listAll);
studentsRouter.post("/list/one", isAuthenticated, StudentsRepository.listOne);
studentsRouter.delete("/:id", isAuthenticated, StudentsRepository.deleteStudent);
studentsRouter.put("/:id", isAuthenticated, StudentsRepository.editStudent);

export default studentsRouter;
