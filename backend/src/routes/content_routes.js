import express from "express";
import * as homePageSection from "../controllers/content/homepagesections_controller.js";
import * as bannerSection from "../controllers/content/banners_controller.js";
import * as featuredItem from "../controllers/content/featureditems_controller.js";
import * as media from "../controllers/content/media_controller.js"

const router = express.Router();

// Homepage Section
router.get("/homepagesection/", homePageSection.getHomePageSections);
router.get("/homepagesection/:id", homePageSection.getHomePageSection);
router.post("/homepagesection/add", homePageSection.addHomePageSection);
router.put("/homepagesection/update/:id", homePageSection.updateHomePageSection);
router.delete("/homepagesection/:id", homePageSection.deleteHomePageSection);

// Banner
router.get("/banners/",bannerSection.getBanners)
router.post("/banners/add", bannerSection.addBanner);
router.put("/banners/update/:id", bannerSection.updateBanner);
router.delete("/banners/delete/:id", bannerSection.deactivateBanner);

// Featured Item
router.get("/featureditems/:section", featuredItem.getFeaturedItem);
router.post("/featureditems/add", featuredItem.addFeaturedItem);
router.put("/featureditems/update/:id", featuredItem.updateFeaturedItem);
router.delete("/featureditems/delete/:id", featuredItem.removeFeaturedItem);

// Media
router.post("/media/attachimagetobook/:bookId/images",media.attachImagesToBook);
export default router;
