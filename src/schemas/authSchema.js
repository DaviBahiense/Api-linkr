import joi from 'joi';

const singUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  name: joi.string().required(),
  img: joi.string().uri().required()
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

export {
  singUpSchema,
  loginSchema
} 