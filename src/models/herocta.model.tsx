import mongoose, { Schema, Document, Types } from "mongoose";


export interface IHeroCTA extends Document {
  _id: Types.ObjectId;
  image: string;
  label: string;
  title: string;
  buttonText: string;
  link: string;
  order: number;
}




const heroCTASchema = new Schema<IHeroCTA>(
  {
    image: { type: String, required: true },
    label: { type: String, required: true },
    title: { type: String, required: true },
    buttonText: { type: String, required: true },
    link: { type: String, required: true },

    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);



const HeroCTA = mongoose.models.User || mongoose.model<IHeroCTA>("HeroCTA", heroCTASchema);
export default HeroCTA;