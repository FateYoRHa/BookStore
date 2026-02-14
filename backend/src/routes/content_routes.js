import express from "express";
import * as homePageSection from "../controllers/content/homepagesections_controller.js";
import * as bannerSection from "../controllers/content/banners_controller.js";
import * as featuredItem from "../controllers/content/featureditems_controller.js";
import * as media from "../controllers/content/media_controller.js";

import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

const adminOnly = [authenticate, authorize("admin")];
const customerOnly = [authenticate, authorize("customer")];

// Homepage Section
router.get("/homepagesection/", homePageSection.getHomePageSections);
router.get(
  "/homepagesection/:id",
  authenticate,
  homePageSection.getHomePageSection,
);
router.post(
  "/homepagesection/add",
  adminOnly,
  homePageSection.addHomePageSection,
);
router.put(
  "/homepagesection/update/:id",
  adminOnly,
  homePageSection.updateHomePageSection,
);
router.delete(
  "/homepagesection/:id",
  adminOnly,
  homePageSection.deleteHomePageSection,
);

// Banner
router.get("/banners/", bannerSection.getBanners);
router.post("/banners", adminOnly, bannerSection.addBanner);
router.put("/banners/:id", adminOnly, bannerSection.updateBanner);
router.delete("/banners/:id", adminOnly, bannerSection.deactivateBanner);

// Featured Item
router.get("/featureditems/:section", featuredItem.getFeaturedItem);
router.post("/featureditems", adminOnly, featuredItem.addFeaturedItem);
router.put(
  "/featureditems/:id",
  adminOnly,
  featuredItem.updateFeaturedItem,
);
router.delete(
  "/featureditems/:id",
  adminOnly,
  featuredItem.removeFeaturedItem,
);

// Media
router.post(
  "/media/attachimagetobook/:bookId/images",
  adminOnly,
  media.attachImagesToBook,
);
export default router;
