import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    profileImg:{
      type:String,
      required:true
    },
    phone: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    isVerified:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

// userSchema.post('init',function(doc){
//   console.log(doc);
//   doc.profileImg = `${process.env.BASE_URL}/Profile Photo/${doc.profileImg}`
// })

export const userModel = model("user", userSchema);
