const sql = require("mssql");
const config =
  "Data Source=.;Initial Catalog=NewsFeed;Username=Kerry;Password=007Catdogs;";

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log(pool);
    return pool;
  })
  .catch(err => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
  sql,
  poolPromise
};
