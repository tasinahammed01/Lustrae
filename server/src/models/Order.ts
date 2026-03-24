import mongoose, { Schema } from "mongoose";

export interface OrderItem {
  _id?: string;
  productId?: string;
  name?: string;
  price?: number;
  image?: string;
  quantity?: number;
  [key: string]: unknown;
}

export interface OrderDocument extends mongoose.Document {
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    customerInfo: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true, trim: true },
    },
    items: {
      type: [
        {
          productId: { type: String },
          name: { type: String },
          price: { type: Number },
          image: { type: String },
          quantity: { type: Number },
        },
      ],
      default: [],
    },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Order =
  (mongoose.models.Order as mongoose.Model<OrderDocument>) ||
  mongoose.model<OrderDocument>("Order", orderSchema);
