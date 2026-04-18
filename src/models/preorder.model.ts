import mongoose, { Types, Schema, Document, Model } from "mongoose";

export interface IPreOrder extends Document {
  _id: Types.ObjectId
  fullname: string;
  email: string;
  phone: string;            // User's WhatsApp number
  style: string;            // Style name/title
  description: string;      // Short description
  additionalInfo?: string;  // Extra details (optional)
  images: string[];         // Uploaded Cloudinary URLs
  status: "ordered" | "processing" | "sorted" | "complete";
  createdAt: Date;
}

const PreOrderSchema: Schema<IPreOrder> = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    style: { type: String, required: true },
    description: { type: String, required: true },
    additionalInfo: { type: String },
    images: { type: [String], required: true },
    status: {
      type: String,
      enum: ["ordered" | "processing" | "sorted" | "complete"],
      required: true,
      index: true,
      lowercase: true,
      trim: true},
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PreOrder: Model<IPreOrder> =
  mongoose.models.PreOrder ||
  mongoose.model<IPreOrder>("PreOrder", PreOrderSchema);

export default PreOrder;