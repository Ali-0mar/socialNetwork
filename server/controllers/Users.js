import User from "../models/User.js";
import NotFoundError from "../errors/notFoundError.js";
import ServerError from "../errors/serverError.js";
import BadRequestError from "../errors/BadRequestError.js";
export const getUser = async (req, res, next) =>{
    try {
        const {id} = req.params;
        if(!id) {
            throw new BadRequestError('User ID');
        }
        const user  = await User.findById(id);
        if(!user) {
            throw new NotFoundError('User')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getUserFriends = async (req, res, next)=>{
    try {
        const {id} = req.params;
        if(!id) {
            throw new BadRequestError('User ID');
        }
        const user = await User.findById(id);
        if(!user) {
            throw new NotFoundError('User')
        }
        const friendsList = await Promise.all(
            user.friends.map(id=> User.findById(id))
        )
        if(!friendsList) {
            throw new NotFoundError('User');
        }
        const formattedFriendsList = friendsList.map(({
            _id,
            fistName,
            lastName,
            occupation,
            location,
            picturePath
        }) =>( {
                    _id,
                    fistName,
                    lastName,
                    occupation,
                    location,
                    picturePath
            })
        );
        res.status(200).json(formattedFriendsList);
    } catch (error) {
        console.log(error)
        next(error);
    }
};

export const addRemoveFriend = async (req, res, next) =>{
    try {
        const {id, friendId} = req.params;
        if (!id || !friendId) {
            throw new BadRequestError(`${!id && ''}, ${!friendId && ''}`);
        }
        const user = await User.findById(id);
        const friend = await User.find(id);
        if(!user || ! friend) {
            throw new NotFoundError('User');
        }
        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter(id=> id !== friendId)
            friend.friends = friend.friends.filter(friendId => friendId !== id)
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friendsList = await Promise.all(
            user.friends.map(id=> User.findById(id))
        )
        if(!friendsList) {
            throw new NotFoundError('User');
        }
        const formattedFriendsList = friendsList.map((
            {
                _id,
                fistName,
                lastName,
                occupation,
                location,
                picturePath
            }) =>( {
                _id,
                fistName,
                lastName,
                occupation,
                location,
                picturePath
            })
        );
        res.status(200).json(formattedFriendsList)
    } catch(error) {
        console.log(error)
        next(error)
    }
}