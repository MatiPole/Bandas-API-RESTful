import Usuarios from "../models/usuarios_models.js";
import bcrypt from "bcrypt";

async function listaUsuarios() {
  let user = await Usuarios.find({ status: true });
  return user;
}

async function findPorNombre(nombre) {
  let user = await Usuarios.find({ nombre: nombre });
  return user;
}

async function findUsusairo(id) {
  let user = await Usuarios.find({ _id: id });
  return user;
}

async function createUsuario(body) {
  let user = new Usuarios({
    email: body.email,
    nombre: body.nombre,
    password: bcrypt.hashSync(body.password, 10),
  });
  return await user.save();
}

async function updateUsuario(body, id) {
  let user = await Usuarios.updateOne(
    { _id: id },
    {
      $set: {
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
      },
    }
  );
  return user;
}

async function deleteUsuario(id) {
  let user = await Usuarios.deleteOne({ _id: id });
  return user;
}

async function limiteUsuarios(num) {
  let users = await Usuarios.find().limit(num);
  return users;
}

async function ordenPorEmail() {
  let users = await Usuarios.find().sort({ email: 1 });
  return users;
}

export {
  listaUsuarios,
  findPorNombre,
  findUsusairo,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  limiteUsuarios,
  ordenPorEmail,
};
