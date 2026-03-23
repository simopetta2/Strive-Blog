import express from 'express'
import dotenv from 'dotenv'
import {connect} from './db.js'

dotenv.config()
connect()
const app = express()
app.get('/', (request, response)=>{
response.status(200).json({message : 'server funzionante'})
})
app.listen(process.env.PORT, ()=>{
    console.log('server in ascolto');
    
})