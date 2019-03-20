const sql = require("mssql");
const config =
  "Data Source=.;Initial Catalog=NewsFeed;User ID=Kerry;Password=Password1;";

const poolPromise = new sql.ConnectionPool(config)
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
