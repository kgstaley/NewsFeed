const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const connString = process.env.SQL_ConnectionString;
connString.split()

const poolPromise = new sql.ConnectionPool(connString)
  .connect()
  .then(pool => {
    console.log(pool);
    return pool;
  })
  .catch(
    err => console.log("Database Connection Failed! Bad Config: ", err),
    sql.close()
  );

module.exports = {
  sql,
  poolPromise
};
