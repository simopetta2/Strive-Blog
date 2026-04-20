import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: String
}, { timestamps: true });

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    cover: { type: String },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}, {
    timestamps: true
});

const BlogPost = mongoose.model('Blog post schema', BlogPostSchema);
export default BlogPost;