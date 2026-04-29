import mongoose, { Schema, Document, Types } from "mongoose";


export interface IHeroSlide extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  order: number;
  createdAt: Date;
}



const heroSlideSchema = new Schema<IHeroSlide>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },

    ctaText: { type: String },
    ctaLink: { type: String },

    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.HeroSlide ||
  mongoose.model<IHeroSlide>("HeroSlide", heroSlideSchema);