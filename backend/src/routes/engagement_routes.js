import express from "express";

import * as wishlist from "../controllers/engagement/wishlists_controller.js";
import * as review from "../controllers/engagement/reviews_controller.js";
import * as newsletter from "../controllers/engagement/newsletters_controller.js";

import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();
const customerOnly = [authenticate, authorize("customer")];
// WISHLIST
router.put("/wishlist/", customerOnly, wishlist.addToWishlist);
router.put("/wishlist/remove/", customerOnly, wishlist.removeFromWishlist);

// REVIEW
router.post("/review/", customerOnly, review.addReview);
router.put("/review", customerOnly, review.updateReview);

// NEWSLETTER
router.post("/newsletter/", newsletter.createNewsLetter);

export default router;
