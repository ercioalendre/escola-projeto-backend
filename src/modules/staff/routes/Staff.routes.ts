import { Router } from "express";
import StaffController from "@modules/staff/controllers/Staff.controller";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import checkNewStaffMemberForm from "@shared/http/middlewares/checkNewStaffMemberForm";

const staffRouter = Router();

staffRouter.post(
  "/register",
  isAuthenticated,
  checkNewStaffMemberForm,
  StaffController.createStaffMember,
);

staffRouter.post("/list/one", isAuthenticated, StaffController.listOne);
staffRouter.get("/list/all", isAuthenticated, StaffController.listAll);
staffRouter.put("/:id", isAuthenticated, StaffController.editStaffMember);
staffRouter.delete("/:id", isAuthenticated, StaffController.deleteStaffMember);

export default staffRouter;
