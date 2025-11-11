import db from "../config/db.js";

export const categoriaModelo = {

  // EJERCICIO 1: INSERTAR Categoría
  crear: (data, callback) => {
    const sql = "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)";
    db.query(sql, [data.nombre, data.descripcion], callback);
  },

  // EJERCICIO 2: LISTAR Categorías
  obtenerTodas: (callback) => {
    const sql = "SELECT id, nombre, descripcion FROM categorias";
    db.query(sql, callback);
  },

  // EJERCICIO 3: OBTENER Categoría por ID
  obtenerPorId: (id, callback) => {
    const sql = "SELECT id, nombre, descripcion FROM categorias WHERE id = ?";
    db.query(sql, [id], callback);
  },

  // EJERCICIO 4: ACTUALIZAR Categoría
  actualizar: (data, callback) => {
    const sql = "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?";
    db.query(sql, [data.nombre, data.descripcion, data.id], callback);
  },

  // EJERCICIO 5: ELIMINAR Categoría + productos asociados
  eliminar: (id, callback) => {
    const sqlProductos = "DELETE FROM productos WHERE categoria_id = ?";
    const sqlCategoria = "DELETE FROM categorias WHERE id = ?";

    db.query(sqlProductos, [id], err => {
      if (err) return callback(err);
      db.query(sqlCategoria, [id], callback);
    });
  }
};
