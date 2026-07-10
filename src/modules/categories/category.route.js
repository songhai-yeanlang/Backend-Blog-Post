const express = require('express');
const { authMiddleware, isLogin,isAdmin } = require('../auth/auth.middleware');
const categoryController = require('./category.controller');
const { createCategorySchema, updateCategorySchema } = require('./category.validtion');

const router = express.Router();

router.post('/create-category', isLogin, isAdmin, authMiddleware(createCategorySchema), categoryController.createCategory);
router.put('/update-category/:id', isLogin, isAdmin, authMiddleware(updateCategorySchema), categoryController.updateCategory);
router.delete('/delete-category/:id', isLogin, isAdmin, categoryController.deleteCategory);
router.get('/get-all-categories', categoryController.getAllCategories);

module.exports = router;
