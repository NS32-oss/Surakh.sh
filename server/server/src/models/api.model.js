import mongoose from "mongoose";

const apiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },  
    projectName: {
      type: String,
      default: "My Project",
    },
    secretKey: {
      type: String,
      required: true,
    },
    revoke: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Api = mongoose.model("apis", apiSchema);