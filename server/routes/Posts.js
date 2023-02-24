import express from "express";
import {getFeedPosts, likePost, getUserPosts} from "../controllers/Posts.js"
import {verifyToken} from "../middlewares/authorization.js";

const router = await express.Router();
/* Get */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts)

/* Patch */
router.patch('/:id/like', verifyToken, likePost)
export default router;