import { Router } from "express";
import { addCustomer, deleteCustomer, getCustomer, getCustomers, updateCustomer } from "../controllers/customers_controller.js";

const router = Router()

router.get("/", getCustomers)
router.get("/:id", getCustomer);
router.post("/add", addCustomer);
router.put("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);

export default router