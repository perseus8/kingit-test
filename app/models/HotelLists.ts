import mongoose, { Schema, Document } from "mongoose";
import { IHotelListing } from "../types/types";

const HotelSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  countryId: { type: String, required: true },
  city: { type: String, required: true },
  cityId: { type: String, required: true },
  price: { type: Number, required: true },
  stars: { type: Number, required: true },
  imageUrl: { type: String },
  cachedAt: { type: Date, default: Date.now, expires: "20m" },
});

HotelSchema.index({ cachedAt: 1 }, { expireAfterSeconds: 20 * 60 });

export default mongoose.models.Hotel ||
  mongoose.model<IHotelListing>("Hotel", HotelSchema);
