import express from "express";
import { productosController } from "../Controladores/productoControlador.js";

const router = express.Router();

router.post("/", productosController.crear); // Ejercicio 6
router.get("/", productosController.obtenerTodos); // Ejercicio 7
router.get("/:id", productosController.obtenerPorId); // Ejercicio 8
router.put("/:id", productosController.actualizar); // Ejercicio 9
router.patch("/:id/stock", productosController.actualizarStock); // Ejercicio 10

export default router;
