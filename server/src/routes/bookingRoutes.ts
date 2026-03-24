
import { Router, type Router as ExpressRouter } from "express";

import { createBooking, listBookings } from "../controllers/bookingController";

const router: ExpressRouter = Router();

router.post("/", createBooking);
router.get("/", listBookings);

export default router;

