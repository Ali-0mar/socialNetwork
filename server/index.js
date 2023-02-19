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

/* Mongoose Database Configurations*/
const PORT = process.env.PORT || 8000;
try{

    await mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await app.listen(PORT);
    console.log(`Server Running on port ${PORT}`);
} catch (e) {
    console.log(e)
}