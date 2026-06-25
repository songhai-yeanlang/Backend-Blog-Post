const express = require('express');
const { authMiddleware, isLogin, isAdmin } = require('../auth/auth.middleware');
const tagController = require('./tag.controller');
const { createTagSchema, updateTagSchema } = require('./tag.validation');

const router = express.Router();

router.post('/create-tag', isLogin, isAdmin, authMiddleware(createTagSchema), tagController.createTag);
router.get('/get-all-tags', tagController.getAllTags);
router.put('/update-tag/:id', isLogin, isAdmin, authMiddleware(updateTagSchema), tagController.updateTag);
router.delete('/delete-tag/:id', isLogin, isAdmin, tagController.deleteTag);
module.exports = router;
