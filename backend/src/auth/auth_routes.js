import express from "express";
import * as auth from "./auth_controller.js";

import userValidation from "./auth_validation.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/register", userValidation, validateRequest, auth.register);

export default router;
