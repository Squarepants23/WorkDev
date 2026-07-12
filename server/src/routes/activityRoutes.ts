import { Router } from "express";
import { getRecentActivity } from "../controllers/activityController";

const router = Router();

router.get("/", getRecentActivity);

export default router;