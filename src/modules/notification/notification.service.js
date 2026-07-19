const notificationModel = require('./notification.model');

const getNotifications = async (accountId) => {
    const userId = await notificationModel.getUserIdByAccountId(accountId);
    if (!userId) {
        const error = new Error('User profile not found');
        error.statusCode = 404;
        throw error;
    }

    const notifications = await notificationModel.getNotificationsByUserId(userId);
    const unreadCount = await notificationModel.getUnreadCount(userId);

    return {
        notifications,
        unreadCount
    };
};

const getUnreadCount = async (accountId) => {
    const userId = await notificationModel.getUserIdByAccountId(accountId);
    if (!userId) {
        const error = new Error('User profile not found');
        error.statusCode = 404;
        throw error;
    }
    const count = await notificationModel.getUnreadCount(userId);
    return { unreadCount: count };
};

const markAsRead = async (accountId, notifId) => {
    const userId = await notificationModel.getUserIdByAccountId(accountId);
    const notification = await notificationModel.findNotificationById(notifId);
    if (!notification) {
        const error = new Error('Notification not found');
        error.statusCode = 404;
        throw error;
    }
    if (notification.receiver_id !== userId) {
        const error = new Error('Access denied');
        error.statusCode = 403;
        throw error;
    }
    await notificationModel.markAsRead(notifId);
};

const markAllAsRead = async (accountId) => {
    const userId = await notificationModel.getUserIdByAccountId(accountId);
    if (!userId) {
        const error = new Error('User profile not found');
        error.statusCode = 404;
        throw error;
    }
    const updated = await notificationModel.markAllAsRead(userId);
    return { updated };
};

const deleteNotification = async (accountId, notifId) => {
    const userId = await notificationModel.getUserIdByAccountId(accountId);
    const notification = await notificationModel.findNotificationById(notifId);
    if (!notification) {
        const error = new Error('Notification not found');
        error.statusCode = 404;
        throw error;
    }
    if (notification.receiver_id !== userId) {
        const error = new Error('Access denied');
        error.statusCode = 403;
        throw error;
    }
    await notificationModel.deleteNotification(notifId);
};

module.exports = {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
};
