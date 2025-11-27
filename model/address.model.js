import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_Line:{
        type:String,
        default:""
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      default: "", 
      
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "",
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false, // عشان لو عايزة تحددي عنوان افتراضي
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel;
