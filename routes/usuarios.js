import express from "express";
import verificarToken from "../middlewares/auth.js";
import {
  listaUsuarios,
  findPorNombre,
  findUsusairo,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  limiteUsuarios,
  ordenPorEmail,
} from "../controllers/usuarios_controller.js";
import Joi from "joi";
const route = express.Router();

//Validacioón para crear usuarios utilizando joi.
const schema = Joi.object({
  nombre: Joi.string().alphanum().min(3).max(20).required(), //es requerido y tiene que tener entre 3 y 20 caracteres
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[^\\s]{6,20}$"
      )
    )
    .required(), //requiere al menos una letra minúscula, una letra mayúscula, un número y al menos uno de los caracteres especiales(!@#$%^&*)
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
});

route.post("/", (req, res) => {
  let body = req.body;
  const { error, value } = schema.validate({
    nombre: body.nombre,
    email: body.email,
    password: body.password,
  });
  if (!error) {
    let result = createUsuario(body);
    result
      .then((user) => {
        res.json({
          value: user,
        });
      })
      .catch((err) => {
        res.status(400).json({
          err,
          message:
            "Error al crear un nuevo usuario, verifique los datos ingresados",
        });
      });
  } else {
    res.status(400).json({
      error,
    });
  }
});

//Obtenemos todos los usuarios registrados
route.get("/", verificarToken, (req, res) => {
  let result = listaUsuarios();
  result
    .then((users) => {
      res.json({
        users,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Paginado
route.get("/limit-users", verificarToken, (req, res) => {
  let result = limiteUsuarios(req.query.limit);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Ordenamiento por email
route.get("/orden-por-email", verificarToken, (req, res) => {
  let result = ordenPorEmail();
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Buscar usuario por id
route.get("/:id", verificarToken, (req, res) => {
  let result = findUsusairo(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Buscar usuario por nombre
route.get("/nombre/:nombre", verificarToken, (req, res) => {
  let result = findPorNombre(req.params.nombre);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Modifición de información del usuario (nombre y contraseña)
route.put("/actualizar-usuario/:id", verificarToken, (req, res) => {
  let result = updateUsuario(req.body, req.params.id);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Eliminar usuario por id
route.delete("/:id", verificarToken, (req, res) => {
  let result = deleteUsuario(req.params.id);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
