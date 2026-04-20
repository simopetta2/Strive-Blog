import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    birthDate: { type: String },
    avatar: { type: String },
    password: { type: String, required: false },
    googleId: { type: String }
});


AuthorSchema.pre('save', async function () {

    if (!this.password || !this.isModified('password')) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

    } catch (error) {
        throw error;
    }
});

const Author = mongoose.model('Author', AuthorSchema);
export default Author;