import express from "express";

import * as wishlist from "../controllers/engagement/wishlists_controller.js";
import * as review from "../controllers/engagement/reviews_controller.js";
import * as newsletter from "../controllers/engagement/newsletters_controller.js";

import { customerOnly } from "../middleware/roles.js";

const router = express.Router();
// WISHLIST
router.put("/wishlist", customerOnly, wishlist.addToWishlist);
router.put("/wishlist/remove", customerOnly, wishlist.removeFromWishlist);
router.get("/wishlist", customerOnly, wishlist.wishlist);

// REVIEW
router.post("/review", customerOnly, review.addReview);
router.put("/review", customerOnly, review.updateReview);

// NEWSLETTER
router.post("/newsletter", newsletter.createNewsLetter);

export default router;
