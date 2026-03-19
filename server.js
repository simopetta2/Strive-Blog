import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.get('/', (request, response)=>{
response.status(200).json({message : 'server funzionante'})
})
app.listen(process.env.PORT, ()=>{
    console.log('server in ascolto');
    
})