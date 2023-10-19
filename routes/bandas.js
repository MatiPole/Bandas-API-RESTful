import express from "express";
import verificarToken from "../middlewares/auth.js";
import {
  bandasList,
  findBanda,
  findPorNombre,
  createBanda,
  updateDiscos,
  deleteBanda,
  filterPaisOrigen,
  filterGenero,
  ordenPorNombre,
  limitarBandas,
} from "../controllers/bandas_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verificarToken

//get
//Búsqueda de todas las bandas
route.get("/", verificarToken, (req, res) => {
  let result = bandasList();
  result
    .then((bands) => {
      res.json(bands);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Ordenar por nombre las bandas
route.get("/orden-por-nombre", verificarToken, (req, res) => {
  let result = ordenPorNombre();
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Paginado ejemplo: localhost:3000/bandas/limitar-bandas?pagina=1&limite=2
route.get("/limitar-bandas", verificarToken, (req, res) => {
  let result = limitarBandas(req.query.pagina, req.query.limite);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Búsqueda por id
route.get("/:id", verificarToken, (req, res) => {
  let result = findBanda(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Búsqueda por nombre
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

//Agregar una nueva banda
route.post("/", verificarToken, (req, res) => {
  let result = createBanda(req);
  result
    .then((banda) => {
      res.json({
        banda,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Actualizar los discos de la banda.
route.put("/discos/:id", verificarToken, (req, res) => {
  let result = updateDiscos(req.body, req.params.id);
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

//Eliminar una banda
route.delete("/:id", verificarToken, (req, res) => {
  let result = deleteBanda(req.params.id);
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

//Filtros
//Filtro por pais de origen
route.get("/pais-origen/:paisorigen", verificarToken, (req, res) => {
  let result = filterPaisOrigen(req.params.paisorigen);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Filtro por género
route.get("/genero/:genero", verificarToken, (req, res) => {
  let result = filterGenero(req.params.genero);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
