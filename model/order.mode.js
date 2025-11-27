import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // الطلب مرتبط بمستخدم
      required: true,
    },
orderID:{

    type:String,
    required:[true,"provide orderID"],
    unique:true
},
productID: {
          type: mongoose.Schema.ObjectId,
          ref: "Product", // لازم يكون عندك موديل Product
          required: true,
        },

        productDetails:{
type:String,
image:Array

        },

paymentID:{
    type:String,
    default:""
},
paymentStatus:{
    type:String,
    default:""
}
,
deliveryAddress: {
      type: mongoose.Schema.ObjectId,
      ref: "Address", // يربط العنوان بالطلب
      required: true,
    },
subTotalAmount: {
          type: Number,
          default: 0,
        },
        totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    invoice_receipt:{

        type:String,
        default:""
    }
  },


      
  {
    timestamps: true, // createdAt & updatedAt
  }
);



const OrderModel = mongoose.model("Order", orderSchema);

export default Order;
