import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "Website",
    },

    techStack: {
      type: [String],
      default: [],
    },

    github: {
      type: String,
      default: "",
    },

    demo: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);