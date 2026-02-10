import express from "express";

import * as wishlist from "../controllers/engagement/wishlists_controller.js"

const router = express.Router()

// WISHLIST
router.put("/wishlist/add/", wishlist.addToWishlist);
router.put("/wishlist/remove/", wishlist.removeFromWishlist);



export default router