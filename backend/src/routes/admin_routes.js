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
import * as adminDashboard from "../controllers/admin/analytics/admin_dashboard_controller.js";

import { adminOnly } from "../middleware/roles.js";
import { uploadImage, requireFiles } from "../middleware/upload.js";
const router = express.Router();

// BOOKS
router.get("/books", adminOnly, adminBooks.getAdminBooks);
router.post("/books", adminOnly, adminBooks.addBook);
router.put("/books/:id", adminOnly, adminBooks.updateBook);
router.delete("/books/:id", adminOnly, adminBooks.removeBook);
router.patch("/books/:id/restore", adminOnly, adminBooks.restoreBook);

// AUTHORS
router.get("/authors", adminOnly, adminAuthors.getAdminAuthors);
router.get("/authors/list", adminOnly, adminAuthors.getAdminAuthorsList);
router.post("/authors", adminOnly, adminAuthors.addAuthor);
router.put("/authors/:id", adminOnly, adminAuthors.updateAuthor);
router.delete("/authors/:id", adminOnly, adminAuthors.removeAuthor);
router.patch("/authors/:id/restore", adminOnly, adminAuthors.restoreAuthor);

// CATEGORIES
router.get("/categories", adminOnly, adminCategories.getAdminCategories);
router.post("/categories", adminOnly, adminCategories.addCategory);
router.put("/categories/:id", adminOnly, adminCategories.updateCategory);
router.delete("/categories/:id", adminOnly, adminCategories.removeCategory);
router.patch(
  "/categories/:id/restore",
  adminOnly,
  adminCategories.reAddCategory,
);

// CUSTOMERS
router.get("/customers", adminOnly, adminCustomers.getCustomers);

// ORDERS
router.get("/orders", adminOnly, adminOrders.getAdminOrders);
router.put("/orders/:id", adminOnly, adminOrders.updateOrder);
router.get("/order/detail/:id", adminOnly, adminOrders.getOrderDetail);
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

router.patch(
  "/upload/images",
  adminOnly,
  uploadImage.array("images"),
  requireFiles("Image"),
  adminMedia.uploadImages,
);
router.delete("/delete/images", adminOnly, adminMedia.deleteImages);

// BANNERS
router.post("/banners", adminOnly, adminBanners.addBanner);
router.put("/banners/:id", adminOnly, adminBanners.updateBanner);
router.delete("/banners/:id", adminOnly, adminBanners.deactivateBanner);

// FEATUREDITEMS
router.get("/featureditems", adminOnly, adminFeaturedItems.getFeaturedItems);
router.get("/featureditems/:id", adminOnly, adminFeaturedItems.getFeaturedItem);
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

// DASHBOARD
router.get("/dashboard/revenue", adminOnly, adminDashboard.getDashboardRevenue);
router.get(
  "/dashboard/customer-summary",
  adminOnly,
  adminDashboard.getDashboardCustomerSummary,
);
router.get(
  "/dashboard/performance-summary",
  adminOnly,
  adminDashboard.getDashboardPerformanceSummary,
);
export default router;
