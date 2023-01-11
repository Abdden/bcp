import Joi from 'joi';

const validateArticle = (req, res, next) => {
  const articleSchema = Joi.object({
    title: Joi.string().min(12).required(),
    image: Joi.string().required(),
    content: Joi.string().min(20).required(),
    comment: Joi.string().min(20),
  });

  const { error } = articleSchema.validate(req.body);
  if (error) {
    res.status(404);
    return res.send(error.details[0].message);
  }
  next();
};

export default validateArticle;
