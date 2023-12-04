import Joi, { ObjectSchema } from "joi";

const eventSchema: ObjectSchema = Joi.object().keys({
  image: Joi.string().required().messages({
    "any.required": "Image is a required field",
    "string.empty": "Image property is not allowed to be empty"
  }),
  name: Joi.string().optional().allow(null, ""),
  eventType: Joi.string().optional().allow(null, ""),
  price: Joi.number().optional().allow(null, ""),
  discountPrice: Joi.number().optional().allow(null, ""),
  startDate: Joi.string().optional().allow(null, ""),
  endDate: Joi.string().optional().allow(null, ""),
  address: Joi.object().keys({
    hotel: Joi.string().optional().allow(null, ""),
    street: Joi.string().optional().allow(null, ""),
    web: Joi.string().optional().allow(null, "")
  }),
  attractions: Joi.array().items(Joi.string().optional().allow(null, "")),
  extraAttractions: Joi.array().items(Joi.string().optional().allow(null, "")),
  imgVersion: Joi.string().optional().allow(null, ""),
  imgId: Joi.string().optional().allow(null, ""),
  energyland: Joi.boolean().optional().allow(null, ""),
  status: Joi.string().optional().allow(null, "")
});

export { eventSchema };
