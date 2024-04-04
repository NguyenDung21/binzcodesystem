import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/MongoDb.js';
import authRoutes from './Routes/auth.js'
import listCourses from './Routes/courses.js'
import CourseDetail from './Routes/courseDetail.js'
import cors from 'cors';
dotenv.config();
connectDatabase();



const app = express();
app.use(cors({origin: true, credentials: true}))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api',listCourses);
app.use('/api',CourseDetail);

//SINGLE PRODUCT FROM SERVER
// app.get("/api/products/:id",(req,res)=>{
//     const product = products.find((p) => p._id==req.params.id);
//     res.json(product);
// })
// app.get("/",(req,res) =>{
//     res.send("API is Running")
// })

const PORT = process.env.PORT || 1000;



app.listen(PORT,console.log(`Server is running port ${PORT}`))
