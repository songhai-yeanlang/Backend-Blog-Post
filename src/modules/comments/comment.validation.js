const joi = require('joi');

const createCommentSchema = joi.object({
    post_id: joi.number().integer().positive().required().messages({
        'number.base': 'post_id must be a number',
        'any.required': 'post_id is required'
    }),
    content: joi.string().min(1).required().messages({
        'string.empty': 'content cannot be empty',
        'any.required': 'content is required'
    })
});

const updateCommentSchema = joi.object({
    content: joi.string().min(1).required().messages({
        'string.empty': 'content cannot be empty',
        'any.required': 'content is required'
    })
});

module.exports = {
    createCommentSchema,
    updateCommentSchema
};
