import express from "express";
import {
  adminLogin,
  getAllBlogsAdmin,
  getAllComment,
  getDashboard,
  deleteCommentById,
  approveCommentById,
} from "../controllers/adminController.js";
import auth from "../middleweres/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.get("/comments", auth, getAllComment);
adminRouter.get("/dashboard", auth, getDashboard);
adminRouter.delete("/delete-comment", auth, deleteCommentById);
adminRouter.patch("/approve-comment", auth, approveCommentById);

export default adminRouter;
