import Author from '../models/Author.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function login(req, res) {
    try {
        const { email, password } = req.body
        let author = await Author.findOne({ email })
        if (!author) {
            return res.status(401).send({ message: 'Wrong credentials' })
        }

        const result = await bcrypt.compare(password, author.password)
        if (!result) {
            return res.status(401).send({ message: 'Wrong credentials' })
        }

        const token = jwt.sign({ id: author._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export const googleCallback = async (req, res) => {
    try {

        const payload = { id: req.user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });


        res.redirect(`http://localhost:5173/login?token=${token}`);
    } catch (error) {
        console.error("Errore nel Google Callback:", error);

        res.redirect('http://localhost:5173/login?error=auth_failed');
    }
};