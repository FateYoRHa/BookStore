import express from "express";
import * as adminOrders from "../controllers/admin/commerce/admin_orders_controller.js";
import * as adminBooks from "../controllers/admin/core/admin_books_controller.js";
import * as adminAuthors from "../controllers/admin/core/admin_authors_controller.js";
import * as adminCategories from "../controllers/admin/core/admin_category_controller.js";
import * as adminCustomers from "../controllers/admin/core/admin_customers_controller.js";
import * as adminHomePageSection from "../controllers/admin/content/admin_homepagesections_controller.js";
import * as adminMedia from "../controllers/admin/content/admin_media_controller.js";
import * as adminBanners from "../controllers/admin/content/admin_banners_controller.js";
import * as adminFeaturedItems from "../controllers/admin/content/admin_featureditems_controller.js";

import { adminOnly } from "../middleware/roles.js";
const router = express.Router();

// BOOKS
router.get("/books", adminOnly, adminBooks.getAdminBooks);
router.post("/books", adminOnly, adminBooks.addBook);
router.put("/books/:id", adminOnly, adminBooks.updateBook);

// AUTHORS
router.post("/authors", adminOnly, adminAuthors.addAuthor);
router.put("/authors/:id", adminOnly, adminAuthors.updateAuthor);
router.delete("/authors/:id", adminOnly, adminAuthors.removeAuthor);

// CATEGORIES
router.post("/categories", adminOnly, adminCategories.addCategory);
router.put("/categories/:id", adminOnly, adminCategories.updateCategory);
router.delete("/categories/:id", adminOnly, adminCategories.deleteCategory);

// CUSTOMERS
router.get("/customers", adminOnly, adminCustomers.getCustomers);

// ORDERS
router.put("/orders/:id", adminOnly, adminOrders.updateOrder);

// HOMEPAGESECTION
router.post(
  "/homepagesection/add",
  adminOnly,
  adminHomePageSection.addHomePageSection,
);
router.put(
  "/homepagesection/update/:id",
  adminOnly,
  adminHomePageSection.updateHomePageSection,
);
router.delete(
  "/homepagesection/:id",
  adminOnly,
  adminHomePageSection.deleteHomePageSection,
);

// MEDIA
router.post(
  "/media/attachimagetobook/:bookId/images",
  adminOnly,
  adminMedia.attachImagesToBook,
);

// BANNERS
router.post("/banners", adminOnly, adminBanners.addBanner);
router.put("/banners/:id", adminOnly, adminBanners.updateBanner);
router.delete("/banners/:id", adminOnly, adminBanners.deactivateBanner);

// FEATUREDITEMS

router.post("/featureditems", adminOnly, adminFeaturedItems.addFeaturedItem);
router.put(
  "/featureditems/:id",
  adminOnly,
  adminFeaturedItems.updateFeaturedItem,
);
router.delete(
  "/featureditems/:id",
  adminOnly,
  adminFeaturedItems.removeFeaturedItem,
);

export default router;
