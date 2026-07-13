import mongoose, { Types, Schema, Document, Model } from "mongoose";

export interface IAppointment extends Document {
  _id: Types.ObjectId
  fullname: string;
  email: string;
  phone: string;            
  service: "Custom Fabrics" | "Custom Styles (Made to Fit)" | "Others";
  proposedDate: Date;
  additionalNotes?: string; 
  status: "pending" | "treated";
  treatedAt?: Date;
  treatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: {
      type: String,
      enum: [
        "Custom Fabrics",
        "Custom Styles (Made to Fit)",
        "Others",
      ],
      required: true,
      trim: true,
    },
    proposedDate: { type: Date, required: true},
    additionalNotes: { type: String },
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

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment ||
  mongoose.model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;