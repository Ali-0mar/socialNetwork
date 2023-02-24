import express from "express";
import {signIn} from "../controllers/Auth.js";
const router = express.Router();

router.post('/signIn',signIn)

export default router;