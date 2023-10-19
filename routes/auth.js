import express from "express";
import Usuario from "../models/usuarios_models.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const route = express.Router();

route.post("/", (req, res) => {
  Usuario.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        const passwordValido = bcrypt.compareSync(
          req.body.password,
          data.password
        );
        if (!passwordValido) {
          return res.status(400).json({
            message: "Contraseña incorrecta",
          });
        }
        const jwToken = jwt.sign(
          {
            usuario: { _id: data._id, nombre: data.nombre, email: data.email },
          },
          process.env.SEED,
          { expiresIn: process.env.EXPIRATION }
        );
        res.json({
          usuario: {
            _id: data._id,
            nombre: data.nombre,
            email: data.email,
          },
          jwToken,
        });
      } else {
        res.status(400).json({
          message: "Usuario incorrecto",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: "ok",
        msj: "Error en el servicio" + err,
      });
    });
});

export default route;
