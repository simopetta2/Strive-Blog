import mongoose from 'mongoose'
import BlogPost from '../models/BlogPost.js'

export async function findAll(req, res) {
    try {
        const { page, limit } = req.query

        const blogPostsQuery = BlogPost.find().populate('author')

        if (page && limit) {
            blogPostsQuery.skip((page - 1) * limit).limit(limit)
        }
        const blogPosts = await blogPostsQuery
        res.status(200).json(blogPosts)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// controllers/blogposts.js

export async function findById(req, res) {
    try {
        const { id } = req.params;
        // FONDAMENTALE: aggiungi .populate('author')
        const blogPost = await BlogPost.findById(id).populate('author');

        if (!blogPost) {
            return res.status(404).json({ message: 'Post non trovato' });
        }
        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function create(req, res) {
    try {

        const { category, title, readTime, author, content } = req.body

        const blogPost = new BlogPost({
            category,
            title,
            readTime,
            author,
            content,

            cover: req.file ? req.file.path : "https://picsum.photos/800/600"
        })

        const newBlogPost = await blogPost.save()


        const populatedPost = await BlogPost.findById(newBlogPost._id).populate('author')

        res.status(201).json(populatedPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function update(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid blog post id' })
        }

        const updateData = { ...req.body }


        if (req.file) {
            updateData.cover = req.file.path
        }

        const updatedBlogPost = await BlogPost.findByIdAndUpdate(
            id,
            updateData,
            { returnDocument: "after" }
        ).populate('author')

        if (!updatedBlogPost) {
            return res.status(404).json({ message: 'blog post not found' })
        }
        res.status(200).json(updatedBlogPost)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function cancell(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid Blog post id' })
        }
        const deleteBlogPost = await BlogPost.findByIdAndDelete(id)
        if (!deleteBlogPost) {
            return res.status(404).json({ message: 'Blog post not found' })
        }
        res.status(200).json({ message: 'Blog post deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export async function uploadBlogPostCover(req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid blog post id' })
        }
        if (!req.file) {
            return res.status(400).json({ message: 'error uploading file' })
        }

        const blogPostCover = await BlogPost.findByIdAndUpdate(
            id,
            { cover: req.file.path },
            { returnDocument: 'after' }
        ).populate('author')

        if (!blogPostCover) {
            return res.status(404).json({ message: 'blog post not found' })
        }

        res.status(200).json(blogPostCover)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const getPosts = async (req, res) => {

    const posts = await BlogPost.find().populate('author');
    res.json(posts);
};