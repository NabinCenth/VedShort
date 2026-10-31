import express from "express";
import router from "./routes/url.route.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
const app=express();
app.use(cors({origin: process.env.CLIENT_URL}));
app.use(express.json());
app.use(router);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});