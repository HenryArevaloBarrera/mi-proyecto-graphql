import fs from "fs";
import { dishes } from "../util/dishes.mjs";

function saveChanges() {
  const content = `export const dishes = ${JSON.stringify(dishes, null, 2)};\n`;
  fs.writeFileSync("./util/dishes.mjs", content, "utf-8");
  console.log("💾 Archivo dishes.mjs actualizado correctamente.");
}

function getAll() {
  return dishes;
}

function getById(id) {
  return dishes.find((dish) => dish.id === Number(id));
}

function Update(id, name, price) {
  const dish = dishes.find((d) => d.id === Number(id));
  if (!dish) throw new Error(`No se encontró el plato con id ${id}`);

  if (name !== undefined) dish.name = name;
  if (price !== undefined) dish.price = price;

  saveChanges();
  return dish;
}

export { getAll, getById, Update };
