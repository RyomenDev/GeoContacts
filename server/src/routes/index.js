import express from "express";
const router = express.Router();

import adminRoutes from "./admin.routes.js";
router.use("/admin", adminRoutes);

export default router;
