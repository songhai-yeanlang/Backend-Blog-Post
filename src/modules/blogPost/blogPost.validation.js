const joi = require('joi');

const createBlogSchema = joi.object({
    title: joi.string().min(3).max(255).required().messages({
        'string.empty': 'title is required',
        'any.required': 'title is required'
    }),
    content: joi.string().required().messages({
        'string.empty': 'content is required',
        'any.required': 'content is required'
    }),
    category_id: joi.number().integer().positive().required().messages({
        'number.base': 'category_id must be a number',
        'any.required': 'category_id is required'
    }),
    tags: joi.alternatives().try(
        joi.array().items(joi.number().integer().positive()),
        joi.string()
    ).optional()
});

const updateBlogSchema = joi.object({
    title: joi.string().min(3).max(255).optional(),
    content: joi.string().optional(),
    category_id: joi.number().integer().positive().optional(),
    tags: joi.alternatives().try(
        joi.array().items(joi.number().integer().positive()),
        joi.string()
    ).optional()
});

const getBlogsQuerySchema = joi.object({
    page: joi.number().integer().positive().default(1),
    limit: joi.number().integer().positive().max(100).default(8),
    userId: joi.number().integer().positive().optional()
});

module.exports = {
    createBlogSchema,
    updateBlogSchema,
    getBlogsQuerySchema
};
