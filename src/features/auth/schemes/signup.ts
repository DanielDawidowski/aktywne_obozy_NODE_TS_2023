import Joi, { ObjectSchema } from "joi";

const signupSchema: ObjectSchema = Joi.object().keys({
  username: Joi.string().required().min(4).max(30).messages({
    "string.base": "Username must be of type string",
    "string.min": "Username must be minimum 4 characters",
    "string.max": "Username must be maximum 20 characters",
    "string.empty": "Username is a required field"
  }),
  password: Joi.string().required().min(6).max(30).messages({
    "string.base": "Password must be of type string",
    "string.min": "Password must be minimum 6 characters",
    "string.max": "Password must be maximum 30 characters",
    "string.empty": "Password is a required field"
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email must be of type string",
    "string.email": "Email must be valid",
    "string.empty": "Email is a required field"
  }),
  role: Joi.string().messages({
    "string.base": "Role must be of type string"
  })
});

export { signupSchema };
