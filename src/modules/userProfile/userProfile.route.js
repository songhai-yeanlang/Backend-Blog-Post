const express = require('express');
const { authMiddleware, isLogin } = require('../auth/auth.middleware');
const userProfileController = require('./userProfile.controller');
const { updateProfileSchema } = require('./userProfile.validation');
const { upload } = require('../../configs/upload.config');

const router = express.Router();
router.get('/my-profile', isLogin, userProfileController.getProfile);
router.put('/update-profile', isLogin, authMiddleware(updateProfileSchema), userProfileController.updateProfile);
router.post('/profile/avatar', isLogin, upload.single('avatar'), userProfileController.updateAvatar);
router.get('/get-all-users', userProfileController.getAllUsers);
router.get('/get-user/:id', userProfileController.getUserById);


module.exports = router;
