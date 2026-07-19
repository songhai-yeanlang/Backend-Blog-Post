const express = require('express');
const { isLogin } = require('../auth/auth.middleware');
const notificationController = require('./notification.controller');

const router = express.Router();

router.get('/notifications', isLogin, notificationController.getNotifications);
router.get('/notifications/unread-count', isLogin, notificationController.getUnreadCount);
router.patch('/notifications/:id/read', isLogin, notificationController.markAsRead);
router.patch('/notifications/mark-all-read', isLogin, notificationController.markAllAsRead);
router.delete('/notifications/:id', isLogin, notificationController.deleteNotification);

module.exports = router;
