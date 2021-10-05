import { Router } from "express";
import usersRouter from "@modules/users/routes/Users.routes";
import staffRouter from "@modules/staff/routes/Staff.routes";
import studentsRouter from "@modules/students/routes/Students.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/staff", staffRouter);
router.use("/students", studentsRouter);
router.use("*", (req, res) => {
  res.status(404).json("404 - Page not found.");
});

export default router;
