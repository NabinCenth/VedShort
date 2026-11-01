import express,{type Express} from "express";
import router from "./routes/url.route.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
const app:Express =express();
app.set("trust proxy", 1)
app.use(cors({origin: process.env.CLIENT_URL}));
app.use(express.json());
app.use(router);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});