import mongoose from "mongoose";

const uri = "mongodb+srv://jairoarmando:FvpyKzzDs4anFwMZ@cluster0.n99bjxu.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "GraphQL_DB", 
    });
    console.log("✅ Conectado a MongoDB Atlas correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
  }
};
