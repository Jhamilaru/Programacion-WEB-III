// Importar módulos
import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda_db" // CORREGIDO
});

// Probar conexión
db.connect(err => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});

// Ruta principal para probar en navegador
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// EJERCICIO 1 - POST Agregar categoría
app.post("/categorias", (req, res) => {
  const { nombre, descripcion } = req.body;
  const sql = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)";
  db.query(sql, [nombre, descripcion], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({
      message: "Categoría registrada correctamente",
      id: result.insertId
    });
  });
});

// EJERCICIO 2 - GET Categorías
app.get("/categorias", (req, res) => {
  const sql = "SELECT id, nombre, descripcion FROM categorias";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// EJERCICIO 3 - GET Categoría + productos
app.get("/categorias/:id", (req, res) => {
  const { id } = req.params;

  const sqlCategoria =
    "SELECT id, nombre, descripcion FROM categorias WHERE id = ?";
  const sqlProductos = "SELECT * FROM productos WHERE categoria_id = ?";

  db.query(sqlCategoria, [id], (err, categoriaResult) => {
    if (err) return res.status(500).send(err);

    if (categoriaResult.length === 0) {
      return res.status(404).send({ message: "Categoría no encontrada" });
    }

    db.query(sqlProductos, [id], (err, productosResult) => {
      if (err) return res.status(500).send(err);

      res.send({
        categoria: categoriaResult[0],
        productos: productosResult
      });
    });
  });
});

// EJERCICIO 4 - PUT Actualizar categoría
app.put("/categorias/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  const sql = "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?";

  db.query(sql, [nombre, descripcion, id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Categoría no encontrada" });
    }

    res.send({ message: "Categoría actualizada correctamente" });
  });
});

// EJERCICIO 5 - DELETE Categoría + productos
app.delete("/categorias/:id", (req, res) => {
  const { id } = req.params;

  const sqlProductos = "DELETE FROM productos WHERE categoria_id = ?";
  const sqlCategoria = "DELETE FROM categorias WHERE id = ?";

  db.query(sqlProductos, [id], (err) => {
    if (err) return res.status(500).send(err);

    db.query(sqlCategoria, [id], (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Categoría no encontrada" });
      }

      res.send({
        message: "Categoría y sus productos fueron eliminados correctamente "
      });
    });
  });
});

// EJERCICIO 6
// EJERCICIO 6 - POST Registrar producto
app.post("/productos", (req, res) => {
  const { nombre, precio, stock, categoria_id } = req.body;
  const sql = "INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)";

  db.query(sql, [nombre, precio, stock, categoria_id], (err, result) => {
    if (err) return res.status(500).send(err);

    res.send({
      message: "Producto registrado correctamente",
      id: result.insertId
    });
  });
});

// EJERCICIO 7
// OBTENER todos los productos con el nombre de su categoría (JOIN)
app.get("/productos", (req, res) => {
  const sql = `
    SELECT productos.id, productos.nombre, productos.precio, productos.stock,
    categorias.nombre AS categoria
    FROM productos
    INNER JOIN categorias ON productos.categoria_id = categorias.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// EJERCICIO 8
// OBTENER producto por ID incluyendo nombre de categoría
app.get("/productos/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT productos.id, productos.nombre, productos.precio, productos.stock,
    categorias.nombre AS categoria
    FROM productos
    INNER JOIN categorias ON productos.categoria_id = categorias.id
    WHERE productos.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length === 0) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    res.json(results[0]);
  });
});

// EJERCICIO 9
// ACTUALIZAR un producto por ID
app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, categoria_id } = req.body;

  const sql = `
    UPDATE productos 
    SET nombre = ?, precio = ?, stock = ?, categoria_id = ? 
    WHERE id = ?
  `;

  db.query(sql, [nombre, precio, stock, categoria_id, id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    res.send({ message: "Producto actualizado correctamente" });
  });
});

// EJERCICIO 10
// ACTUALIZAR SOLO el stock de un producto (sumar o restar cantidad)
app.patch("/productos/:id/stock", (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  // Validar que se envió la cantidad
  if (cantidad === undefined) {
    return res.status(400).send({ message: "Debes enviar la cantidad" });
  }

  const sql = `
    UPDATE productos 
    SET stock = stock + ? 
    WHERE id = ?
  `;

  db.query(sql, [cantidad, id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    res.send({ message: "Stock actualizado correctamente" });
  });
});


// INICIAR SERVIDOR
const puerto = 3001;
app.listen(puerto, () => {
  console.log(`Servidor activo en: http://localhost:${puerto}`);
});
