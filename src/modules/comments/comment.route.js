const express = require('express');
const { authMiddleware, isLogin } = require('../auth/auth.middleware');
const commentController = require('./comment.controller');
const { createCommentSchema, updateCommentSchema } = require('./comment.validation');

const router = express.Router();

router.post('/create-comment', isLogin, authMiddleware(createCommentSchema), commentController.createComment);
router.put('/update-comment/:id', isLogin, authMiddleware(updateCommentSchema), commentController.updateComment);
router.get('/get-all-comment/:id', commentController.getAllCommentsByPostId);
router.delete('/delete-comment/:id', isLogin, commentController.deleteComment);

module.exports = router;
