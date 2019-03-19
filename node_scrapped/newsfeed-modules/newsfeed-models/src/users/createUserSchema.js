const joi = require("joi");
const Schema = require("../Schema");

const createUserValidator = joi.object({
  username: joi
    .string()
    .min(2)
    .max(50)
    .required(),
  firstname: joi
    .string()
    .min(2)
    .max(50)
    .required(),
  lastname: joi
    .string()
    .min(2)
    .max(50)
    .required(),
  email: joi
    .string()
    .min(2)
    .max(100)
    .required(),
  password: joi
    .string()
    .min(2)
    .max(50)
    .required()
});

module.exports = new Schema(createUserValidator);
