import mongoose from "mongoose";

const { model } = mongoose;

export interface IEntry extends mongoose.Document {
  title: string;
  type: "movie" | "tv_show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  imageUrl?: string;
}

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["movie", "tv_show"],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    budget: {
      type: String, // e.g., "$160M" or "$3M/ep"
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String, // e.g., "148 min" or "45 min/ep"
      required: true,
    },
    year: {
      type: String, // e.g., "2010" or "2008–2013"
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

const Entry = model<IEntry>("Entry", entrySchema);

export default Entry;
