import Joi from 'joi';
const validator = (Schema) => (payload) =>
  Schema.validate(payload, { abortEarly: false });

const validateSignup = (req, res, next) => {
  const signUpSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = signUpSchema.validate(req.body);
  if (error) {
    res.status(404);
    return res.send(error.details[0].message);
  }
  next();
};

export default validateSignup;
