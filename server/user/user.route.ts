import express from "express";
import { userController } from "./user.config";
import { protectRoute } from "../auth/auth.config";

const router = express.Router();

router.get("/profile", protectRoute, userController.getProfileUser);

export default router;
