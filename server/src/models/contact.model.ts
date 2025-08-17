import mongoose, { Schema, Document, Model } from "mongoose";



export interface IContact extends Document {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: Date;
}

const contactSchema = new Schema<IContact>(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (email: string) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Invalid email format",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      validate: {
        validator: (phone: string) =>
          /^\+?[1-9]\d{1,14}$/.test(phone),
        message: "Invalid phone number format",
      },
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
export default Contact;
