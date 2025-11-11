import { categoriaModelo } from "../Modelos/categoriaModelo.js";
import db from "../config/db.js";

export const categoriasController = {

  // EJERCICIO 1
  crear: (req, res) => {
    categoriaModelo.crear(req.body, (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Categoría registrada", id: result.insertId });
    });
  },

  // EJERCICIO 2
  obtenerTodas: (_, res) => {
    categoriaModelo.obtenerTodas((err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  },

  // EJERCICIO 3
  obtenerConProductos: (req, res) => {
    const id = req.params.id;
    categoriaModelo.obtenerPorId(id, (err, categoriaResult) => {
      if (err) return res.status(500).send(err);
      if (!categoriaResult.length) return res.status(404).send({ message: "No existe" });

      const sqlProductos = "SELECT * FROM productos WHERE categoria_id = ?";
      db.query(sqlProductos, [id], (err, productosResult) => {
        if (err) return res.status(500).send(err);
        res.send({ categoria: categoriaResult[0], productos: productosResult });
      });
    });
  },

  // EJERCICIO 4
  actualizar: (req, res) => {
    categoriaModelo.actualizar({ ...req.body, id: req.params.id }, (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Categoría actualizada" });
    });
  },

  // EJERCICIO 5
  eliminar: (req, res) => {
    categoriaModelo.eliminar(req.params.id, (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Categoría y productos eliminados" });
    });
  }
};
