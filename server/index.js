const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const app = express();

app.use(cors(
//     {
//     credentials: true,
//     origin: "http://localhost:5173"
// }
));
app.use(express.json());  //this is to do to be able to parse the post requests

// app.use(function(req, res, next){
//     res.header('Content-Type', 'application/json;charset=UTF-8')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-with, Content-Type, Accept'
//     )
//     next()
// })

app.use("/admin", adminRouter);
app.use("/user", userRouter);


//connect to MongoDB
mongoose.connect(
    "mongodb+srv://ravibaraskar108:UMm8cbcpWZau565J@cluster0.jdksxeb.mongodb.net/courses");
app.listen(4000, () => console.log('Server running on port 4000'));