import { productosModel } from "../Modelos/productoModelo.js";

export const productosController = {

  // EJERCICIO 6
  crear: (req, res) => {
    productosModel.crear(req.body, (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Producto registrado", id: result.insertId });
    });
  },

  // EJERCICIO 7
  obtenerTodos: (_, res) => {
    productosModel.obtenerTodos((err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  },

  // EJERCICIO 8
  obtenerPorId: (req, res) => {
    productosModel.obtenerPorId(req.params.id, (err, results) => {
      if (err) return res.status(500).send(err);
      if (!results.length) return res.status(404).send({ message: "No encontrado" });
      res.json(results[0]);
    });
  },

  // EJERCICIO 9
  actualizar: (req, res) => {
    productosModel.actualizar({ ...req.body, id: req.params.id }, (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Producto actualizado" });
    });
  },

  // EJERCICIO 10
  actualizarStock: (req, res) => {
    productosModel.actualizarStock(req.params.id, req.body.cantidad, (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: "Stock actualizado" });
    });
  }
};
