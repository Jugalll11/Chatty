const express = require("express")
const cors  = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./Routes/userRoutes")


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/app/api/auth", userRoutes);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
}).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on ${process.env.PORT}`)
})


