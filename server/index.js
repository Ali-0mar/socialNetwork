import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import {fileURLToPath} from 'url';
import {signUp} from "./controllers/Auth.js";
import {createPost} from "./controllers/Posts.js";
import authRoutes from './routes/Auth.js'
import userRoutes from './routes/Users.js'
import postsRoutes from './routes/Posts.js'
import errorHandler from "./errors/errorHandler.js";
import {verifyToken} from "./middlewares/authorization.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import {posts, users} from "./data/index.js"
import user from "./models/User.js";
/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}));
app.use(morgan("common"));
app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors());
app.use('/assets',
    express.static(path.join(__dirname, 'public/assets'))
);
/* File Storage Configuration */
const storage = multer.diskStorage({
     destination (req, file, callback){
         callback(null, 'public/assets')
    },
    filename(req, file, callback) {
        callback(null, file.originalname)
    }
});
const upload = multer({storage});
/*------------------------------Start Routes {------------------------------*/
/* Start Routes With Files { */
app.post('/auth/signUp', upload.single('picture'), signUp);
app.post('/posts', verifyToken, upload.single('picture'), createPost)

/* } End Routes With Files */

/* Start Authentication Routes{ */
app.use('/auth', authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes)
/* } End Authentication Routes */

/*---------------} End Routes---------------*/

/*--------------- Start Error Handling {-----------------*/
app.use(errorHandler);
/*--------------- } EndError Handling-----------------*/

/* Mongoose Database Configurations*/
const PORT = process.env.PORT || 8000;
try{

    await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await Post.insertMany(posts);
    await User.insertMany(users)
    await app.listen(PORT);
    console.log(`Server Running on port ${PORT}`);
} catch (e) {
    console.log(e)
}