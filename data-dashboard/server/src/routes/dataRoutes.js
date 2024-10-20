import { Router } from "express";
import {
  totalTimeSpent,
  featureTimeTrend,
} from "../controllers/dataController.js";

const router = Router();

router.get("/totalTimeSpent", totalTimeSpent);
router.get("/featureTimeTrend", featureTimeTrend);

export default router;
