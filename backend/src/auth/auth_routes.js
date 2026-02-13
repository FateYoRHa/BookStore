import express from "express";
import * as auth from "./auth_controller.js";

import { validateUser, validateLogin } from "./auth_validation.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/register", validateUser, validateRequest, auth.register);
router.post("/login", validateLogin, validateRequest, auth.login);
router.post("/refresh", auth.refresh);
router.post("/logout", auth.logout);
export default router;
