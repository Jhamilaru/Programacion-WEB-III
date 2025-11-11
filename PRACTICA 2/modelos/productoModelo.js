import db from "../config/db.js";
export const productosModel = {

  // EJERCICIO 6: Crear Producto
  crear: (data, callback) => {
    const sql = "INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [data.nombre, data.precio, data.stock, data.categoria_id], callback);
  },

  // EJERCICIO 7: Mostrar productos + nombre categoría
  obtenerTodos: (callback) => {
    const sql = `
      SELECT productos.id, productos.nombre, productos.precio, productos.stock,
      categorias.nombre AS categoria
      FROM productos
      INNER JOIN categorias ON productos.categoria_id = categorias.id
    `;
    db.query(sql, callback);
  },

  // EJERCICIO 8: Producto por ID + Categoría
  obtenerPorId: (id, callback) => {
    const sql = `
      SELECT productos.id, productos.nombre, productos.precio, productos.stock,
      categorias.nombre AS categoria
      FROM productos
      INNER JOIN categorias ON productos.categoria_id = categorias.id
      WHERE productos.id = ?
    `;
    db.query(sql, [id], callback);
  },

  // EJERCICIO 9: Actualizar producto completo
  actualizar: (data, callback) => {
    const sql = `
      UPDATE productos 
      SET nombre = ?, precio = ?, stock = ?, categoria_id = ? 
      WHERE id = ?
    `;
    db.query(sql, [data.nombre, data.precio, data.stock, data.categoria_id, data.id], callback);
  },

  // EJERCICIO 10: Modificar stock sumando/restando
  actualizarStock: (id, cantidad, callback) => {
    const sql = "UPDATE productos SET stock = stock + ? WHERE id = ?";
    db.query(sql, [cantidad, id], callback);
  }
};
