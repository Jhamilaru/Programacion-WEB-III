import express from "express";
import { categoriasController } from "../Controladores/categoriaControlador.js";

const router = express.Router();

router.post("/", categoriasController.crear); // Ejercicio 1
router.get("/", categoriasController.obtenerTodas); // Ejercicio 2
router.get("/:id", categoriasController.obtenerConProductos); // Ejercicio 3
router.put("/:id", categoriasController.actualizar); // Ejercicio 4
router.delete("/:id", categoriasController.eliminar); // Ejercicio 5

export default router;
