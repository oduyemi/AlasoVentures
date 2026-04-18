import mongoose, { Types, Schema, Document, Model } from "mongoose";

export interface IFlashSale extends Document {
    _id: Types.ObjectId
    productName: string;
    desc: string;            
    originalPrice: string;    
    salePrice: string;
    images: string[]; 
    quantity: number;
    startDate: Date;
    endDate: Date;
    status: "ordered" | "processing" | "sorted" | "complete";
}

const FlashSaleSchema: Schema<IFlashSale> = new Schema(
  {
    productName: { type: String, required: true },
    desc: { type: String, required: true },
    originalPrice: { type: String, required: true },
    salePrice: { type: String, required: true },
    images: { type: [String], required: true },
    quantity: { type: Number },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date},
    status: {
      type: String,
      enum: ["ordered" | "processing" | "sorted" | "complete"],
      required: true,
      index: true,
      lowercase: true,
      trim: true},
  },
  { timestamps: true }
);

const FlashSale: Model<IFlashSale> =
  mongoose.models.FlashSale ||
  mongoose.model<IFlashSale>("FlashSale", FlashSaleSchema);

export default FlashSale;