import express from "express";
import * as homePageSection from "../controllers/content/homepagesections_controller.js";
import * as bannerSection from "../controllers/content/banners_controller.js";
import * as featuredItem from "../controllers/content/featureditems_controller.js";
import * as media from "../controllers/content/media_controller.js";

import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

// Homepage Section
router.get("/homepagesection/", homePageSection.getHomePageSections);
router.get(
  "/homepagesection/:id",
  authenticate,
  homePageSection.getHomePageSection,
);
router.post(
  "/homepagesection/add",
  authenticate,
  homePageSection.addHomePageSection,
);
router.put(
  "/homepagesection/update/:id",
  authenticate,
  homePageSection.updateHomePageSection,
);
router.delete(
  "/homepagesection/:id",
  authenticate,
  homePageSection.deleteHomePageSection,
);

// Banner
router.get("/banners/", bannerSection.getBanners);
router.post("/banners/add", authenticate, bannerSection.addBanner);
router.put("/banners/update/:id", authenticate, bannerSection.updateBanner);
router.delete(
  "/banners/delete/:id",
  authenticate,
  bannerSection.deactivateBanner,
);

// Featured Item
router.get("/featureditems/:section", featuredItem.getFeaturedItem);
router.post("/featureditems/add", authenticate, featuredItem.addFeaturedItem);
router.put(
  "/featureditems/update/:id",
  authenticate,
  featuredItem.updateFeaturedItem,
);
router.delete(
  "/featureditems/delete/:id",
  authenticate,
  featuredItem.removeFeaturedItem,
);

// Media
router.post(
  "/media/attachimagetobook/:bookId/images",
  authenticate,
  media.attachImagesToBook,
);
export default router;
