import { text } from "express";
import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        MinLength: 1,
        MaxLenght: 500
    },
    author: String

},
    {
        timestamps: true

    }
)





const BlogPostSchema = new mongoose.Schema({
    category: String,
    title: String,
    cover: String,
    readTime: {
        value: Number,
        unit: String
    },
    author: String,
    content: String,
    comments: [CommentSchema]
})
const BlogPost = mongoose.model('Blog post schema', BlogPostSchema)
export default BlogPost