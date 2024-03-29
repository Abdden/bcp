import Joi from 'joi';

const validateContact = (req, res, next) => {
  const contactSchema = Joi.object({
    names: Joi.string().min(5).required(),
    email: Joi.string().email().lowercase().required(),
    subject: Joi.string().min(8).required(),
    message: Joi.string().min(12),
  });

  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400);
    return res.send(error.details[0].message);
  }
  next();
};

export default validateContact;
