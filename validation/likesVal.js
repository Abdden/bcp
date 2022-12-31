import Joi from 'joi';

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const likesSchema = Joi.object({
  email: Joi.string().email().required(),
});

const likesVal = validator(likesSchema);

export default likesVal;
