import Joi, { ObjectSchema } from "joi";

const clientSchema: ObjectSchema = Joi.object().keys({
  eventId: Joi.string().required().messages({
    "string.base": "Musi zawierać tylko litery",
    "string.empty": "Wyjazd jest wymagany"
  }),
  eventName: Joi.string().required().messages({
    "string.base": "Musi zawierać tylko litery",
    "string.empty": "Wyjazd jest wymagany"
  }),
  name: Joi.string().required().messages({
    "string.base": "Musi zawierać tylko litery",
    "string.empty": "Imię i Nazwisko jest wymagane"
  }),
  email: Joi.string().required().email().messages({
    "string.base": "Email zawierać tylko litery",
    "string.email": "Email musi być poprawny",
    "string.empty": "Email jest wymagany"
  }),
  tel: Joi.string().required().min(9).max(12).messages({
    "string.base": "To pole jest wymagane",
    "string.min": "Telefon musi zawierać minimum 9 cyfr",
    "string.max": "Telefon  musi zawierać maksimum 12 cyfr",
    "string.empty": "Telefon jest wymagany"
  }),
  birthDate: Joi.string().optional().messages({
    "string.base": "To pole jest wymagane",
    "string.empty": "Data urodzenia jest wymagana"
  }),
  price: Joi.string().optional().messages({
    "string.base": "To pole jest wymagane",
    "string.empty": "Cena jest wymagana"
  })
});

export { clientSchema };
