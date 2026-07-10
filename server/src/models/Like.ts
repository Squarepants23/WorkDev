import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Satu user hanya boleh like satu kali per project
likeSchema.index(
  {
    user: 1,
    project: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Like", likeSchema);