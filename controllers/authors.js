import mongoose from 'mongoose'
import Author from '../models/Author.js'

export async function findAll(req, res) {
    try {
        const authors = await Author.find()
        res.status(200).json(authors)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function findById(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'invalid author id'
            })
        }
        const author = await Author.findById(req.params.id)
        if (!author) {
            return res.status(404).json({
                message: 'author not found'
            })
        }
        res.status(200).json(author)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function create(req, res) {
    try {
        const {
            name,
            surname,
            email,
            birthDate,
            avatar
        } = req.body
        const author = new Author({
            name,
            surname,
            email,
            birthDate,
            avatar
        })
        const newAuthor = await author.save()
        res.status(201).json(newAuthor)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function cancell(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'invalid author id'
            })
        }
        const deleteAuthor = await Author.findByIdAndDelete(id)
        if (!deleteAuthor) {
            return res.status(404).json({
                message: 'author not found'
            })
        }
        res.status(200).json({
            message: 'Author deleted'

        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export async function update(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'invalid author id'
            })
        }
        const {
            name,
            surname,
            email,
            birthDate,
            avatar
        } = req.body
        const updatedAuthor = await Author.findByIdAndUpdate(id,
            {
                name,
                surname,
                email,
                birthDate,
                avatar
            },
            {
                returnDocument:"after"
            })
        if (!updatedAuthor) {
            return res.status(404).json({
                message: 'author not found'
            })
        }
        res.status(200).json({updatedAuthor})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}