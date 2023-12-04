import Joi, { ObjectSchema } from "joi";

const emailSchema: ObjectSchema = Joi.object().keys({
  senderName: Joi.string().required().messages({
    "string.base": "Musi zawierać tylko litery",
    "string.empty": "To pole jest wymagany"
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email jest wymagany",
    "string.email": "Email musi być poprawny",
    "string.empty": "Email jest wymagany"
  }),
  message: Joi.string().required().messages({
    "string.base": "Musi zawierać tylko litery",
    "string.empty": "To pole jest wymagany"
  })
});

export { emailSchema };
