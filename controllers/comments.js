import mongoose from 'mongoose'
import BlogPost from '../models/BlogPost.js'

export async function findAll(req, res) {
    try {
        const { blogPostId } = req.params
        if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
            return res.status(400).json({
                message: 'invalid blog post id'
            })
        }
        const post = await BlogPost.findById(blogPostId)
        if (!post) {
            return res.status(404).json({
                message: 'Blog post not found'
            })
        }
        res.status(200).json(post.comments)
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function findById(req, res) {
    try {


    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function create(req, res) {
    try {
        const { blogPostId } = req.params
        if (!mongoose.Types.ObjectId.isValid(blogPostId)) {
            return res.status(400).json({
                message: 'invalid blog post id'
            })
        }
        const { text, author } = req.body
        const post = await BlogPost.findById(blogPostId)
        if (!post) {
            return res.status(404).json({
                message: 'Blog post not found'
            })
        }
        post.comments.push({ text, author })
        await post.save();
        res.status(201).json(post.comments[post.comments.length - 1])
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function cancell(req, res) {
    try {


    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export async function update(req, res) {
    try {


    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}