const sql = require("mssql");
const config = process.env.SQL_ConnectionString;

const poolPromise = sql
  .ConnectionPool(config)
  .connect()
  .then()

module.exports = { sql, poolPromise };
