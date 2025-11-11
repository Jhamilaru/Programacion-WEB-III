
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("Conectado a MySQL correctamente");
});

export default db;
