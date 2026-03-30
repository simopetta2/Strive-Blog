import express from "express";
import { findAll, findById, create, cancell, update } from "../controllers/authors.js";

const authorRouter = express.Router()
authorRouter.get('/', findAll)
authorRouter.get('/:id', findById)
authorRouter.post('/', create)
authorRouter.delete('/:id', cancell)
authorRouter.put('/:id', update)


export default authorRouter
