import express from "express";
import mongoose from "mongoose";
import usuarios from "./routes/usuarios.js";
import bandas from "./routes/bandas.js";
import auth from "./routes/auth.js";
import path from "path";
import "dotenv/config";

mongoose
  .connect("mongodb://127.0.0.1:27017/bandas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch(() => {
    console.log("Error al conectarse a la base de datos");
  });

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/usuarios", usuarios);
app.use("/auth", auth);
app.use("/bandas", bandas);
app.get("/", function (req, res) {
  res.sendFile("./html/index.html", { root: __dirname });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("Server running...");
});
