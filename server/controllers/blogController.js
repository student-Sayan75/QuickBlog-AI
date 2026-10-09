import fs from "fs";
import imagekit from "../config/imagekit.js";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import generateText from "../config/gemini.js";

//adding new blog
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );

    const imageFile = req.file;

    if (
      !title ||
      !subTitle ||
      !description ||
      !category ||
      isPublished === undefined
    ) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!imageFile) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    const response = await imagekit.files.upload({
      file: fileBuffer.toString("base64"),
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl =
      `${process.env.IMAGEKIT_URL_ENDPOINT}/${response.filePath}` +
      `?tr=q-auto,f-webp,w-1280`;

    const published = isPublished === true || isPublished === "true";

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImageUrl,
      isPublished: published,
    });

    fs.unlinkSync(imageFile.path);

    res.json({
      success: true,
      blog,
      message: "Blog added successfully",
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

//get all blog controller
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({ success: true, blogs, message: "Blogs fetched successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get individual blog data(by blogId)
export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.query;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog, message: "Blog fetched successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//delete individual blog(by blogId)
export const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findByIdAndDelete(blogId.toString());
    if (!blog) {
      res.json({ success: false, message: "Blog not found" });
    }

    //deleting comments related to the blog
    await Comment.deleteMany({ blog: blogId.toString() });
    res.json({
      success: true,
      message: "Blog deleted successfully with associated comments",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//toggle publish status
export const toggleBLogPublish = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({ success: true, message: "Blog status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//add comment on blogPost
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    if (!blog || !name || !content) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added for review" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//get blog comment by blogId
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.query;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({
      success: true,
      comments,
      message: "comments fetched successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//generate blog content using AI
export const generateBlogContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const generatedContent = await generateText(
      prompt +
        "\n\nPlease generate a blog post based on the above title in a professional tone.",
    );
    res.json({ success: true, content: generatedContent });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
