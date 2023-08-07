const mysql2 = require("mysql2");

let pool = mysql2.createPool({
  database: "user_keeper",
  password: "12345678",
  host: "localhost",
  user: "root",
  port: 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log("kết nối thất bại");
  } else {
    console.log("Kết nối thành công");
  }
});

module.exports = pool.promise();
