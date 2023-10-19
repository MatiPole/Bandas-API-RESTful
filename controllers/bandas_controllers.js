import Bandas from "../models/bandas_models.js";

//Se buscan todas las bandas con status true.
async function bandasList() {
  let bandas = await Bandas.find({ status: true });
  return bandas;
}

async function findBanda(id) {
  let banda = await Bandas.find({ _id: id });
  return banda;
}

async function findPorNombre(nombre) {
  let banda = await Bandas.find({ nombre: nombre });
  return banda;
}

async function createBanda(req) {
  let banda = new Bandas({
    nombre: req.body.nombre,
    genero: req.body.genero,
    cantidadintegrantes: req.body.cantidadintegrantes,
    paisorigen: req.body.paisorigen,
    discos: req.body.discos,
    foto: req.body.foto,
  });
  return await banda.save();
}

async function updateDiscos(body, id) {
  let banda = await Bandas.updateOne(
    { _id: id },
    {
      $set: {
        discos: body.discos,
      },
    }
  );
  return banda;
}

async function deleteBanda(id) {
  let banda = await Bandas.deleteOne({ _id: id });
  return banda;
}

async function filterPaisOrigen(paisorigen) {
  let banda = await Bandas.find({ paisorigen: paisorigen });
  return banda;
}

async function filterGenero(genero) {
  let banda = await Bandas.find({ genero: genero });
  return banda;
}

async function ordenPorNombre() {
  let banda = await Bandas.find().sort({ nombre: 1 });
  return banda;
}

async function limitarBandas(pagina, limite) {
  const paginas = parseInt(pagina);
  const limites = parseInt(limite);
  const skip = (paginas - 1) * limites;
  const bandas = await Bandas.find().limit(limites).skip(skip);
  return bandas;
}

export {
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
};
