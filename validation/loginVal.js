import Joi from 'joi';
const validator = (Schema) => (payload) =>
  Schema.validate(payload, { abortEarly: false });

const validateLogin = (req, res, next) => {
  const logInSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = logInSchema.validate(req.body);
  if (error) {
    res.status(404);
    return res.send(error.details[0].message);
  }
  next();
};

export default validateLogin;
