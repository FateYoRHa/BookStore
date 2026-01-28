import express from "express";
import { addUser, getUser, getUsers } from "../controllers/users_controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/addUser", addUser);

export default router;
