import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  imagen: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Usuarios", usuariosSchema);
