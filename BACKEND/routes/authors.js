import express from 'express';
import Author from '../models/Author.js';
import cloudinaryUploader from '../middleware/cloudinary.js';

const router = express.Router();

router.post("/", cloudinaryUploader.single("avatar"), async (req, res) => {
    try {

        const { name, surname, email, password, birthDate } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Dati obbligatori mancanti" });
        }

        const authorExists = await Author.findOne({ email });
        if (authorExists) {
            return res.status(400).json({ message: "Email già registrata" });
        }

        const newAuthor = new Author({
            name,
            surname,
            email,
            password,
            birthDate,
            avatar: req.file ? req.file.path : `https://ui-avatars.com/api/?name=${name}+${surname}`
        });

        await newAuthor.save();

        const authorResponse = newAuthor.toObject();
        delete authorResponse.password;

        res.status(201).json(authorResponse);
    } catch (error) {
        console.error("Errore registrazione:", error);
        res.status(500).json({ message: "Errore interno del server" });
    }
});

export default router;