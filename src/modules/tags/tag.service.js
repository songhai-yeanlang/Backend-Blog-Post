const tagModel = require('./tag.model');

const createTag = async (name) => {
    const existing = await tagModel.findByName(name);
    if (existing) {
        const error = new Error('Tag name already exists');
        error.statusCode = 400;
        throw error;
    }

    const result = await tagModel.create(name);
    const newTag = await tagModel.findById(result.insertId);
    return newTag;
};

const getAllTags = async () => {
    return await tagModel.getAll();
};

const updateTag = async (params, body) => {
    const { id } = params;
    const { name } = body;

    const tag = await tagModel.findById(id);
    if (!tag) {
        const error = new Error('Tag not found');
        error.statusCode = 404;
        throw error;
    }

    const existing = await tagModel.findByName(name);
    if (existing && existing.id !== tag.id) {
        const error = new Error('Tag name already exists');
        error.statusCode = 400;
        throw error;
    }

    await tagModel.updateById(id, name);
    return await tagModel.findById(id);
};

const deleteTag = async (id) => {
    const tag = await tagModel.findById(id);
    if (!tag) {
        const error = new Error('Tag not found');
        error.statusCode = 404;
        throw error;
    }

    await tagModel.deleteById(id);
};

module.exports = {
    createTag,
    getAllTags,
    updateTag,
    deleteTag
};
