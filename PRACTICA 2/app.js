import express from "express";
import bodyParser from "body-parser";

import categoriaRuta from "./ruta/categoriaRuta.js";
import productoRuta from "./ruta/productoRuta.js";

const app = express();
app.use(bodyParser.json());

app.use("/categorias", categoriaRuta);
app.use("/productos", productoRuta);

app.get("/", (_, res) =>
  res.send("Servidor funcionando correctamente ")
);

const puerto = 3001;
app.listen(puerto, () =>
  console.log(`Servidor activo en: http://localhost:${puerto}`)
);
