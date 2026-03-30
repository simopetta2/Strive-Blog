import express from "express";
import { findAll, findById, create, cancell, update } from "../controllers/blogposts.js";

const blogRouter = express.Router()
blogRouter.get('/', findAll)
blogRouter.get('/:id', findById)
blogRouter.post('/', create)
blogRouter.delete('/:id', cancell)
blogRouter.put('/:id', update)


export default blogRouter
