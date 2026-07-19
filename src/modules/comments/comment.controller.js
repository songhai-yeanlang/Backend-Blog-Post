const { handleError } = require('../../utils/handleError');
const commentService = require('./comment.service');

const createComment = async (req, res) => {
    try {
        const data = await commentService.createComment(req.user.id, req.validated || req.body);
        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data
        });
    } catch (error) {
        return await handleError(res, 'commentController', error);
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await commentService.updateComment(req.user.id, id, req.validated || req.body);
        return res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            data
        });
    } catch (error) {
        return await handleError(res, 'commentController', error);
    }
};

const getAllCommentsByPostId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await commentService.getAllCommentsByPostId(id);
        return res.status(200).json({
            success: true,
            message: "Comments retrieved successfully",
            total: data.length,
            data
        });
    } catch (error) {
        return await handleError(res, 'commentController', error);
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await commentService.deleteComment(req.user.id, id);
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch (error) {
        return await handleError(res, 'commentController', error);
    }
};

module.exports = {
    createComment,
    updateComment,
    getAllCommentsByPostId,
    deleteComment
};
