import express from "express";
import {
  addBlog,
  addComment,
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogComments,
  toggleBLogPublish,
} from "../controllers/blogController.js";
import { generateBlogContent } from "../controllers/blogController.js";

import upload from "../middleweres/multer.js";
import auth from "../middleweres/auth.js";

const blogRouter = express.Router();
//blog-routes
blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/getBlog", getBlogById);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, toggleBLogPublish);

//blog-comments-routes
blogRouter.post("/add-comment", addComment);
blogRouter.get("/comments", getBlogComments);

//generate blog content
blogRouter.post("/generate-content", generateBlogContent);
export default blogRouter;
