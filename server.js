import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

//database
connectDB();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path. dirname(__filename)
const app = express();

//middlware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes)
app.use(express.static(path.join(__dirname,'./client/build')))
app.use('*',function(req,res){
   res.sendFile(path.join(__dirname,'./client/build/index.html'))
}
)


app.get('/',(req,res)=>{
res.send("<h1>Welcome</h1>")})


const PORT= process.env.PORT || 8080;
 app.listen(PORT,()=>{
    console.log(`Sever Running on ${PORT}`.bgCyan.white);
 })