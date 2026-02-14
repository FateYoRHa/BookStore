import express from "express";

import * as wishlist from "../controllers/engagement/wishlists_controller.js";
import * as review from "../controllers/engagement/reviews_controller.js";
import * as newsletter from "../controllers/engagement/newsletters_controller.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

// WISHLIST
router.put("/wishlist/add/", authenticate, wishlist.addToWishlist);
router.put("/wishlist/remove/", authenticate, wishlist.removeFromWishlist);

// REVIEW
router.post("/review/create/", authenticate, review.addReview);
router.put("/review/update/:id", authenticate, review.updateReview);

// NEWSLETTER
router.post("/newsletter/create/", authenticate, newsletter.createNewsLetter);

export default router;
