import express from "express";
import { findAll, findById, create, cancell, update, uploadBlogPostCover } from "../controllers/blogposts.js";
import parser from "../middleware/cloudinary.js";

const blogRouter = express.Router()
blogRouter.get('/', findAll)
blogRouter.get('/:id', findById)
blogRouter.post('/', create)
blogRouter.delete('/:id', cancell)
blogRouter.put('/:id', update)
blogRouter.patch('/:id/cover', parser.single('cover'), uploadBlogPostCover)

export default blogRouter
