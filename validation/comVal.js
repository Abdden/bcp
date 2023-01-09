import Joi from 'joi';
const validator = (Schema) => (payload) =>
  Schema.validate(payload, { abortEarly: false });

const validateComment = (req, res, next) => {
const commentSchema = Joi.object({
  comment: Joi.string().min(5).required(),
});

const { error } = commentSchema.validate(req.body);
  if (error) {
    res.status(404);
    return res.send(error.details[0].message);
  }
  next();
}

export default validateComment;
