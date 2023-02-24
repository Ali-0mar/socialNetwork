import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/Users.js";
import {verifyToken} from "../middlewares/authorization.js"
const router = express.Router();

/* Get Routes { */

router.get("/:id", verifyToken, getUser);
router.get("/friends/:id", verifyToken, getUserFriends);

/* } Get Routes  */

/* Post/Patch Routes { */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend)
/* } Post/Patch Routes */

export default router;