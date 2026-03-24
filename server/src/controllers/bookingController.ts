
import type { NextFunction, Request, Response } from "express";

import { Booking } from "../models/Booking";

export async function createBooking(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, phone, service, date, time, notes } = req.body ?? {};

    if (!name || !email || !phone || !service || !date || !time) {
      res.status(400);
      throw new Error("name, email, phone, service, date, time are required");
    }

    const booking = await Booking.create({
      name,
      email,
      phone,
      service,
      date,
      time,
      notes: notes ?? "",
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
}

export async function listBookings(_req: Request, res: Response, next: NextFunction) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    next(err);
  }
}

