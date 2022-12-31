import Joi from 'joi';
const validator = (Schema) => (payload) =>
  Schema.validate(payload, { abortEarly: false });

const validateContact = (req, res, next) => {
  const contactSchema = Joi.object({
    names: Joi.string().min(5).required(),
    email: Joi.string().email().lowercase().required(),
    subject: Joi.string().min(8).required(),
    message: Joi.string().min(12),
  });

  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(404);
    return res.send(error.details[0].message);
  }
  next();
};

export default validateContact;
