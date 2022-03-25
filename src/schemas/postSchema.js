import joi from "joi";

const postSchema = joi.object({
  link: joi.string().uri().required(),
  description: joi.string().allow("").required(),
});

const updatePostSchema = joi.object({
  postId: joi.number().required(),
  description: joi.string().allow("").required(),
});

export { postSchema, updatePostSchema };
