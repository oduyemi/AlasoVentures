import mongoose, { Types, Schema, Document } from "mongoose";


export interface IFlashSale extends Document {
  _id: Types.ObjectId;
  productName: string;
  desc: string;
  originalPrice: number;
  salePrice: number;
  images: string[];
  quantity: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "draft";
  createdAt: Date;
  updatedAt: Date;
}

const FlashSaleSchema: Schema<IFlashSale> = new Schema(
  {
    productName: { type: String, required: true },
    desc: { type: String, required: true },

    originalPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },

    images: { type: [String], required: true },

    quantity: { type: Number, default: 0 },

    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["active", "expired", "draft"],
      default: "active",
      index: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// auto-expire logic
FlashSaleSchema.pre("save", function () {
  if (this.endDate && new Date(this.endDate) < new Date()) {
    this.status = "expired";
  }
});

const FlashSale =
  mongoose.models.FlashSale ||
  mongoose.model<IFlashSale>("FlashSale", FlashSaleSchema);

export default FlashSale;