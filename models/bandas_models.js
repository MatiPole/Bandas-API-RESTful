import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bandasSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  genero: {
    type: String,
    required: true,
  },
  cantidadintegrantes: {
    type: Number,
    required: true,
  },
  paisorigen: {
    type: String,
    required: true,
  },
  discos: {
    type: Array,
    required: true,
  },
  foto: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Bandas", bandasSchema);
