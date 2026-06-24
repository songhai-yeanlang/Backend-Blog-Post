const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const userProfileModel = require('./userProfile.model');

const AVATAR_DIR = path.join(process.cwd(), 'uploads', 'avatars');

const getProfile = async (userId) => {
    const user = await userProfileModel.findById(userId);
    if (!user) {
        const error = new Error('User profile not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
};

const updateProfile = async (userId, body) => {
    const user = await userProfileModel.findById(userId);
    if (!user) {
        const error = new Error('User profile not found');
        error.statusCode = 404;
        throw error;
    }

    await userProfileModel.updateByAccountId(userId, {
        name: body.name,
        phone: body.phone,
        bio: body.bio,
        avatar: body.avatar
    });

    return await userProfileModel.findById(userId);
};

const updateAvatar = async (userId, file) => {
    if (!file) {
        const error = new Error('No image file provided');
        error.statusCode = 400;
        throw error;
    }

    const user = await userProfileModel.findById(userId);
    if (!user) {
        const error = new Error('User profile not found');
        error.statusCode = 404;
        throw error;
    }

    // Ensure avatar directory exists
    if (!fs.existsSync(AVATAR_DIR)) {
        fs.mkdirSync(AVATAR_DIR, { recursive: true });
    }

    const filename = `${userId}_${Date.now()}.webp`;
    const filepath = path.join(AVATAR_DIR, filename);

    // Compress and resize with sharp
    await sharp(file.buffer)
        .resize({ width: 300, height: 300, fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(filepath);

    const avatarUrl = `/uploads/avatars/${filename}`;
    await userProfileModel.updateAvatarByAccountId(userId, avatarUrl);

    return await userProfileModel.findById(userId);
};

const getAllUsers = async () => {
    return await userProfileModel.getAllUsers();
};

module.exports = {
    getProfile,
    updateProfile,
    updateAvatar,
    getAllUsers
};

