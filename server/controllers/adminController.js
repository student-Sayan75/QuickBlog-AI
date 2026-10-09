import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";

//admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "Invalid Credential" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//getting all blogs of the admin
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      blogs,
      message: " All admin's Blogs fetched successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get all comments together
export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      comments,
      message: " All comments fetched successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//admin dashboard data fetching
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);

    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashBoardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.json({
      success: true,
      dashBoardData,
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//delete comment by id
export const deleteCommentById = async (req, res) => {
  const { id } = req.body;
  const deletedComment = await Comment.findByIdAndDelete(id);
  if (!deletedComment) {
    return res.json({
      success: false,
      message: "Comment not found",
    });
  }
  res.json({
    success: true,
    deletedComment,
    message: "Comment has been deleted successfully",
  });
};

//approve comment by id
export const approveCommentById = async (req, res) => {
  const { id } = req.body;
  const approvedComment = await Comment.findByIdAndUpdate(
    id,
    { isApproved: true },
    { new: true },
  );
  if (!approvedComment) {
    return res.json({
      success: false,
      message: "Comment not found",
    });
  }
  res.json({
    success: true,
    approvedComment,
    message: "Comment has been approved successfully",
  });
};
