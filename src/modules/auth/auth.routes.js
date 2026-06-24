const express = require('express');
const authController = require('./auth.controller');
const { authMiddleware, isLogin } = require('./auth.middleware');
const {
    registerUserSchema,
    resendVerificationSchema,
    loginUserSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyOtpSchema
} = require('./auth.validation');

const router = express.Router();

router.post('/register', authMiddleware(registerUserSchema), authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authMiddleware(resendVerificationSchema), authController.resendVerification);
router.post('/login', authMiddleware(loginUserSchema), authController.login);
router.post('/forgot-password', authMiddleware(forgotPasswordSchema), authController.forgotPassword);
router.post('/verify-otp', authMiddleware(verifyOtpSchema), authController.verifyOtp);
router.post('/reset-password', isLogin, authMiddleware(resetPasswordSchema), authController.resetPassword);

module.exports = router;
