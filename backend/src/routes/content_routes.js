import express from "express";
import * as homePageSection from "../controllers/content/homepagesections_controller.js";
import * as bannerSection from "../controllers/content/banners_controller.js";
import * as featuredItem from "../controllers/content/featureditems_controller.js";

import { authenticate } from "../middleware/authenticate.js";


const router = express.Router();
// Homepage Section
router.get("/homepagesection", homePageSection.getHomePageSections);
router.get(
  "/homepagesection/:id",
  authenticate,
  homePageSection.getHomePageSection,
);

// Banner
router.get("/banners", bannerSection.getBanners);

// Featured Item
router.get("/featureditems/:section", featuredItem.getFeaturedItem);

export default router;
