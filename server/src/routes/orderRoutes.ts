import { Router, type Router as ExpressRouter } from "express";

import { createOrder } from "../controllers/orderController";

const router: ExpressRouter = Router();

router.post("/", createOrder);

export default router;
