import express from 'express'
import dotenv from 'dotenv'
import {connect} from './db.js'
import authorRouter from './routes/authors.js'
import blogRouter from './routes/blogposts.js'

dotenv.config()
connect()
const app = express()


app.use(express.json())
app.get('/', (request, response)=>{
response.status(200).json({message : 'server funzionante'})
})
app.use('/authors',authorRouter)
app.use('/blogposts', blogRouter)
app.listen(process.env.PORT, ()=>{
    console.log('server in ascolto');
    
})