import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  idDish: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
    default: "",
  },
});

DishSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Dish = mongoose.model("Dish", DishSchema);
