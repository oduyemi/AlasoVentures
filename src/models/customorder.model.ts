import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type OrderStatus =
  | "ordered"
  | "processing"
  | "ready"
  | "shipped"
  | "complete"
  | "cancelled";

export type CustomerCategory = "male" | "female" | "couple";

export type MaleStyle =
  | "complete_agbada"
  | "senator_wear"
  | "top_trouser"
  | "top_only"
  | "trouser_only"
  | "cap_only";

export type FemaleStyle =
  | "gown"
  | "iro_buba"
  | "skirt_blouse"
  | "wrapper_only"
  | "blouse_only";

export type CoupleStyle = "couple_set";

export type OutfitStyle = MaleStyle | FemaleStyle | CoupleStyle;

export type SizeMode = "standard" | "custom";

export type StandardSize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "3XL"
  | "custom";

export interface IMeasurements {
  // General
  height?: number;
  weight?: number;
  // Male/Female shared
  chest?: number;
  shoulder?: number;
  sleeve?: number;
  waist?: number;
  hip?: number;

  // Female
  bust?: number;

  // Lengths
  topLength?: number;
  trouserLength?: number;
  skirtLength?: number;
  gownLength?: number;
  blouseLength?: number;
  wrapperLength?: number;

  // Accessories
  capSize?: number;
  fitPreference?: string;
}

export interface IIndividualOrderSize {
  role: "male" | "female" | "bride" | "groom";
  sizeMode: SizeMode;
  standardSize?: StandardSize;
  measurements?: IMeasurements;
}

export interface IOutfitDetails {
  category: CustomerCategory;
  style: OutfitStyle;
}

export interface ICustomOrder extends Document {
  _id: Types.ObjectId;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  outfit: IOutfitDetails;
  sizes: IIndividualOrderSize[];
  fabricType?: string;
  fabricColor?: string;
  quantity?: number;
  description: string;
  additionalInfo?: string;
  measurementNotes?: string;
  images: string[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const measurementSchema = new Schema<IMeasurements>(
  {
    height: Number,
    weight: Number,
    chest: Number,
    shoulder: Number,
    sleeve: Number,
    waist: Number,
    hip: Number,
    bust: Number,
    topLength: Number,
    trouserLength: Number,
    skirtLength: Number,
    gownLength: Number,
    blouseLength: Number,
    wrapperLength: Number,
    capSize: Number,

    fitPreference: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const individualOrderSizeSchema = new Schema<IIndividualOrderSize>(
  {
    role: {
      type: String,
      enum: ["male", "female", "bride", "groom"],
      required: true,
    },

    sizeMode: {
      type: String,
      enum: ["standard", "custom"],
      required: true,
    },

    standardSize: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "custom"],
    },

    measurements: {
      type: measurementSchema,
    },
  },
  { _id: false }
);

const outfitDetailsSchema = new Schema<IOutfitDetails>(
  {
    category: {
      type: String,
      enum: ["male", "female", "couple"],
      required: true,
      lowercase: true,
      trim: true,
    },

    style: {
      type: String,
      enum: [
        // Male
        "complete_agbada",
        "senator_wear",
        "top_trouser",
        "top_only",
        "trouser_only",
        "cap_only",

        // Female
        "gown",
        "iro_buba",
        "skirt_blouse",
        "wrapper_only",
        "blouse_only",

        // Couple
        "couple_set",
      ],
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { _id: false }
);


const customOrderSchema = new Schema<ICustomOrder>(
  {
    fname: {
      type: String,
      required: true,
      trim: true,
    },

    lname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    outfit: {
      type: outfitDetailsSchema,
      required: true,
    },

    sizes: {
      type: [individualOrderSizeSchema],
      required: true,
      validate: {
        validator: function (value: IIndividualOrderSize[]) {
          return value.length > 0;
        },
        message: "At least one size entry is required.",
      },
    },

    fabricType: {
      type: String,
      trim: true,
    },

    fabricColor: {
      type: String,
      trim: true,
    },

    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },

    // Order details
    description: {
      type: String,
      required: true,
      trim: true,
    },

    additionalInfo: {
      type: String,
      trim: true,
    },

    measurementNotes: {
      type: String,
      trim: true,
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (value: string[]) {
          return value.length > 0;
        },
        message: "At least one image is required.",
      },
    },

    // Status
    status: {
      type: String,
      enum: [
        "ordered",
        "processing",
        "ready",
        "shipped",
        "complete",
        "cancelled",
      ],
      default: "ordered",
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


const CustomOrder: Model<ICustomOrder> =
  mongoose.models.CustomOrder ||
  mongoose.model<ICustomOrder>("CustomOrder", customOrderSchema);

export default CustomOrder;