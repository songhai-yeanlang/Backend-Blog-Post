const { handleError } = require('../../utils/handleError');
const tagService = require('./tag.service');

const createTag = async (req, res) => {
    try {
        const { name } = req.validated || req.body;
        const data = await tagService.createTag(name);
        return res.status(201).json({
            success: true,
            message: "Tag created successfully",
            data
        });
    } catch (error) {
        return await handleError(res, 'tagController', error);
    }
};

const getAllTags = async (req, res) => {
    try {
        const data = await tagService.getAllTags();
        return res.status(200).json({
            success: true,
            message: "Get all tags successfully",
            data
        });
    } catch (error) {
        return await handleError(res, 'tagController', error);
    }
};

const updateTag = async (req, res) => {
    try {
        const data = await tagService.updateTag(req.params, req.validated || req.body);
        return res.status(200).json({
            success: true,
            message: "Tag updated successfully",
            data
        });
    } catch (error) {
        return await handleError(res, 'tagController', error);
    }
};

const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        await tagService.deleteTag(id);
        return res.status(200).json({
            success: true,
            message: "Tag deleted successfully"
        });
    } catch (error) {
        return await handleError(res, 'tagController', error);
    }
};

module.exports = {
    createTag,
    getAllTags,
    updateTag,
    deleteTag
};
