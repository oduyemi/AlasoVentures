import mongoose, { Schema, Document, Types } from "mongoose";


export interface ITestimony extends Document {
  _id: Types.ObjectId;
  fullname: string;
  email: string;
  who: "returning customer" | "client" | "fashion enthusiast" | "new visitor";
  testimony: string;
  status: "pending" | "approved" | "disapproved"
  createdAt: Date;
}

const testimonySchema = new Schema<ITestimony>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    who: {
      type: String,
      enum: ["returning customer", "client", "fashion enthusiast", "new visitor"],
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    testimony: { type: String, required: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["pending", "approved", "disapproved"],
      required: true,
      index: true,
      default: "pending",
      lowercase: true,
    }
  },
  { timestamps: true }
);

const Testimony =
  mongoose.models.Testimony ||
  mongoose.model<ITestimony>("Testimony", testimonySchema);

export default Testimony;