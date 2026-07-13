import mongoose, { Schema, Document, Types } from "mongoose";


export interface IContact extends Document {
  _id: Types.ObjectId;
  fullname: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "pending" | "treated";
  treatedAt?: Date;
  treatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt:Date;
}


const contactSchema = new Schema<IContact>(
  {
    fullname: { type: String, required: true },
    email: {
        type: String,
        index: true,
        lowercase: true,
        trim: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: { 
        type: String, 
        required:true,
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "treated"],
      default:"pending"
    },
    treatedAt: {
      type: Date,
    },
    
    treatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
export default Contact