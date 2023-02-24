import Post from "../models/Post.js"
import User from "../models/User.js";
import NotFoundError from "../errors/NotFoundError.js";
import BadRequestError from "../errors/BadRequestError.js";
export const createPost = async (req, res, next) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('User')
        }
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        await newPost.save();
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        next(error)
    }
 };

export const getFeedPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        if(!posts) {
            throw new NotFoundError("Posts")
        }
        res.status(200).json(posts);
    } catch (error) {
        next(error)
    }
};

export const getUserPosts = async (req, res, next) => {
    try {
        const {userId} = req.params;
        if(!userId) {
            throw new BadRequestError('User ID');
        }
        const posts = await Post.find({userId});
        if(!posts) {
            throw new NotFoundError("Posts")
        }
        res.status(200).json(posts);
    } catch (error) {
        next(error)
    }
};

export const likePost = async ( req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )
        res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }
};