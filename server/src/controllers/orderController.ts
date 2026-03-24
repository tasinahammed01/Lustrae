import type { Request, Response, NextFunction } from "express";

import { Order } from "../models/Order";

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { customerInfo, items, total } = req.body ?? {};

    if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone) {
      res.status(400);
      throw new Error("customerInfo.name, customerInfo.email, customerInfo.phone are required");
    }

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400);
      throw new Error("items must be a non-empty array");
    }

    if (typeof total !== "number" || Number.isNaN(total) || total < 0) {
      res.status(400);
      throw new Error("total must be a valid number");
    }

    const order = await Order.create({
      customerInfo,
      items,
      total,
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}
