import express from "express";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/core/users_controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/add", addUser);
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser);

export default router;
