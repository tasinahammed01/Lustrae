
import type { NextFunction, Request, Response } from "express";

import { Product } from "../models/Product";

const seedProducts = [
  {
    name: "Radiant Glow Serum",
    price: 48,
    image:
      "https://images.unsplash.com/photo-1611930022073-84a47ee1b3e6?auto=format&fit=crop&w=1200&q=80",
    category: "Skincare",
    rating: 4.7,
  },
  {
    name: "Silk Touch Cleanser",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80",
    category: "Skincare",
    rating: 4.5,
  },
  {
    name: "Velvet Matte Lip Color",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80",
    category: "Makeup",
    rating: 4.6,
  },
  {
    name: "Rose Gold Hair Oil",
    price: 29,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80",
    category: "Hair",
    rating: 4.8,
  },
  {
    name: "Brow Sculpt Kit",
    price: 26,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    category: "Makeup",
    rating: 4.4,
  },
  {
    name: "Luxury Body Lotion",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1200&q=80",
    category: "Body",
    rating: 4.3,
  },
];

export async function getProducts(_req: Request, res: Response, next: NextFunction) {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(seedProducts);
    }

    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

