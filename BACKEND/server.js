import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import { connect } from './db.js'
import authorRouter from './routes/authors.js'
import blogRouter from './routes/blogposts.js'
import commentsRouter from './routes/comments.js'
import authRouter from './routes/auth.js'
import passport from 'passport'
import googleStrategy from './strategy/googleStrategy.js'

dotenv.config()
connect()
const app = express()

app.use(cors())
app.use(express.json())
app.get('/', (request, response) => {
    response.status(200).json({ message: 'server funzionante' })
})

passport.use(googleStrategy)
app.use('/authors', authorRouter)
app.use('/blogposts', blogRouter)
app.use('/', commentsRouter)
app.use('/auth', authRouter)

app.listen(process.env.PORT, () => {
    console.log('server in ascolto');

})