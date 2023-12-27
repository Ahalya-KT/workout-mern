
require('dotenv').config()

const express =require('express')
   
const mongoose= require('mongoose')
const workoutRoutes = require('./routes/workout')
  
// express app
const app = express()

// cors
const cors = require("cors");

const allowedOrigins = ["http://localhost:5173", "http://localhost:5173"];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
 
// middleware 
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})

// routes
app.use('/api/workout',workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to database');
    // listen to port 
    app.listen(process.env.PORT,()=>{
        console.log('listening for request on port',process.env.PORT);
    })
})
.catch((err)=>{
    console.log(err);
})
