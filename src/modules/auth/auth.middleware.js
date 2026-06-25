const { writeErrorLog } = require('../../utils/handleError');
const jwt = require('jsonwebtoken');
const authModel = require('./auth.model');
const { isLogin, isAdmin } = require('../../middleware/user.middleware');

const authMiddleware = (schema) => async (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false
    });
    if (error) {
        return res.status(400).json({
            success: false,
            message: 'invalid field',
            details: error.details.map((d) => d.message)
        });
    } else {
        req.validated = value;
        next();
    }
};


module.exports = {
    authMiddleware,
    isLogin,
    isAdmin
};
