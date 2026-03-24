
import mongoose, { Schema } from "mongoose";

export interface BookingDocument extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<BookingDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    notes: { type: String, default: "" },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Booking =
  (mongoose.models.Booking as mongoose.Model<BookingDocument>) ||
  mongoose.model<BookingDocument>("Booking", bookingSchema);

