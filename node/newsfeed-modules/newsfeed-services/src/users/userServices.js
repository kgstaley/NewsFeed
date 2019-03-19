const { dataProvider, TYPES } = require("newsfeed-data");

const createSqlUserMappings = {
  username: ["Username", TYPES.NVarChar],
  firstname: ["Firstname", TYPES.NVarChar],
  lastname: ["Lastname", TYPES.NVarChar],
  email: ["Email", TYPES.NVarChar],
  password: ["Password", TYPES.NVarChar]
};

class UserService {
  createUser = userAddReq => {
    let procName = "dbo.Users_Insert";
    let userCreated = null;
    return new Promise(promiseExecutor);

    function promiseExecutor(resolve, reject) {
      dataProvider.executeNonQuery(
        procName,
        inputParamMapper,
        returnParamMapper,
        onComplete
      );

      function inputParamMapper(sqlParameters) {
        transformOnWrite(userAddReq);

        for (const key in userAddReq) {
          let itemToInsert = userAddReq[key];
          let sqlMapping = createSqlUserMappings[key];

          sqlParameters.addParameter(
            sqlMapping[0],
            sqlMapping[1],
            itemToInsert
          );
        }

        sqlParameters.addOutputParameter("Id", TYPES.Int);
      }

      function returnParamMapper(sqlParameters) {
        userCreated = sqlParameters.id;
      }

      function onComplete(err) {
        if (err) {
          reject(err);
          return;
        }

        resolve(userCreated);
      }
    }
  };
}

const userService = new UserService();

module.exports = userService;
