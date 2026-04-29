import mongoose, { Schema, Document, Types } from "mongoose";


export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  imageUrl: string;

  category: "custom" | "fabrics" | "accessories";

  subcategory?: {
    type?: "asooke" | "saki" | "kente" | "akwete";
    variant?: "cotton asooke" | "metallic asooke" | "supernet";
    style?: "monotone" | "two-tone";
  };

  customType?: "bride" | "groom" | "couple" | null;

  isFlashSales: boolean;

  pricing?: {
    originalPrice: number;
    salePrice?: number;
  };

  inventory?: {
    quantity: number;
    salesOrderStatus: "instock" | "pending" | "sold";
  };

  sales?: {
    expiryDate?: Date;
  };

  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },

    imageUrl: { type: String, required: true },

    category: {
      type: String,
      enum: ["custom", "fabrics", "accessories"],
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    subcategory: {
      type: {
        type: String,
        enum: ["asooke", "saki", "kente", "akwete"],
      },
      variant: {
        type: String,
        enum: ["cotton asooke", "metallic asooke", "supernet"],
      },
      style: {
        type: String,
        enum: ["monotone", "two-tone"],
      },
    },

    customType: {
      type: String,
      enum: ["bride", "groom", "couple"],
      default: null,
    },

    isFlashSales: {
      type: Boolean,
      default: false,
    },

    pricing: {
      originalPrice: { type: Number },
      salePrice: { type: Number },
    },

    inventory: {
      quantity: { type: Number },
      salesOrderStatus: {
        type: String,
        enum: ["instock", "pending", "sold"],
        default: "instock",
      },
    },

    sales: {
      expiryDate: { type: Date },
    },
  },
  { timestamps: true }
);

productSchema.pre("validate", function (next) {
    const product = this as IProduct;
  
    // CUSTOM LOGIC
    if (product.category === "custom") {
      if (!product.customType) {
        return next(new Error("customType is required for custom products"));
      }
  
      product.subcategory = undefined;
    }
  
    // FABRICS LOGIC
    if (product.category === "fabrics") {
      if (!product.subcategory?.type) {
        return next(new Error("subcategory.type is required for fabrics"));
      }
  
      // Metallic Aso-Oke must have style
      if (product.subcategory.variant === "metallic asooke") {
        if (!product.subcategory.style) {
          return next(new Error("style is required for metallic asooke"));
        }
      }
    }
  
    // FLASH SALES LOGIC
    if (product.isFlashSales) {
      if (!product.pricing?.salePrice) {
        return next(new Error("salePrice required for flash sales"));
      }
  
      if (!product.inventory?.quantity) {
        return next(new Error("quantity required for flash sales"));
      }
  
      if (!product.sales?.expiryDate) {
        return next(new Error("expiryDate required for flash sales"));
      }
    }
  
    next();
  });

  const Product = mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);
  export default Product