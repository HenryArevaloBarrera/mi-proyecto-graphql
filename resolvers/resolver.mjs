import { Dish } from "../models/Dish.mjs";

export const Create = async (args) => {
  try {
    const newDish = new Dish(args);
    return await newDish.save();
  } catch (error) {
    console.error("Error al crear el plato:", error.message);
    return null;
  }
};

export const getAll = async () => {
  try {
    return await Dish.find();
  } catch (error) {
    console.error("Error al obtener los platos:", error.message);
    return [];
  }
};

export const getById = async (id) => {
  try {
    return await Dish.findById(id);
  } catch (error) {
    console.error("Error al buscar el plato:", error.message);
    return null;
  }
};

export const getBetweenCalories = async (min, max) => {
  try {
    return await Dish.find({ calories: { $gte: min, $lte: max } });
  } catch (error) {
    console.error("Error al filtrar por calorías:", error.message);
    return [];
  }
};

export const Update = async (id, data) => {
  try {
    return await Dish.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    console.error("Error al actualizar el plato:", error.message);
    return null;
  }
};

export const Delete = async (id) => {
  try {
    return await Dish.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error al eliminar el plato:", error.message);
    return null;
  }
};
