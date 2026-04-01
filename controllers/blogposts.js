import mongoose from 'mongoose'
import BlogPost from '../models/BlogPost.js'

export async function findAll(req, res) {
    try {
        const blogposts = await BlogPost.find()
        res.status(200).json(blogposts)
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
                message: 'invalid blog post id'
            })
        }
        const blogPost = await BlogPost.findById(id)
        if (!blogPost) {
            return res.status(404).json({
                message: 'blog post non trovato'
            })
        }
        res.status(200).json(blogPost)
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
            category,
            title,
            cover,
            readTime,
            author,
            content
        } = req.body
        const blogPost = new BlogPost({
            category,
            title,
            cover,
            readTime,
            author,
            content
        })
        const newBlogPost = await blogPost.save()
        res.status(201).json(newBlogPost)
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
                message: 'invalid Blog post id'
            })
        }
        const deleteBlogPost = await BlogPost.findByIdAndDelete(id)
        if (!deleteBlogPost) {
            return res.status(404).json({
                message: 'Blog post not found'
            })
        }
        res.status(200).json({
            message: 'Blog post deleted'

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
                message: 'invalid blog post id'
            })
        }
        const {
            category,
            title,
            cover,
            readTime,
            author,
            content
        } = req.body
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(id,
            {
                category,
                title,
                cover,
                readTime,
                author,
                content
            },
            {
                returnDocument: "after"
            })
        if (!updatedBlogPost) {
            return res.status(404).json({
                message: 'blog post not found'
            })
        }
        res.status(200).json({ updatedBlogPost })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export async function uploadBlogPostCover(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'invalid blog post id'
            })
        }
        if (!req.file) {
            return res.status(400).json({
                message: 'error uploading file'
            })
        }

        const blogPostCover = await BlogPost.findByIdAndUpdate(id, { cover: req.file.path }, { returnDocument: 'after' })

        if (!blogPostCover) {
            return res.status(404).json({
                message: 'blog post not found'
            })
        }

        res.status(200).json({ blogPostCover })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}