const createUser = require("./createUserSchema");
const updateUser = require("./updatePostSchema");

const User = {
  createUserSchema: createUser
};

module.exports = User;
