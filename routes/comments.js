import express from "express";
import { findAll, findById, create, cancell, update } from "../controllers/comments.js";

const commentsRouter = express.Router()



commentsRouter.get('/blogposts/:blogPostId/comments', findAll)
commentsRouter.get('/blogposts/:blogPostId/comments/:id', findById)
commentsRouter.post('/blogposts/:blogPostId/comments', create)
commentsRouter.delete('/blogposts/:blogPostId/comments/:id', cancell)
commentsRouter.put('/blogposts/:blogPostId/comments/:id', update)


export default commentsRouter