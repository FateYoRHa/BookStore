import express from "express";

import * as wishlist from "../controllers/engagement/wishlists_controller.js"
import * as review from "../controllers/engagement/reviews_controller.js";

const router = express.Router()

// WISHLIST
router.put("/wishlist/add/", wishlist.addToWishlist);
router.put("/wishlist/remove/", wishlist.removeFromWishlist);

// REVIEW
router.post("/review/create/", review.addReview)
router.put("/review/update/:id", review.updateReview)

export default router