const { handleError } = require('../../utils/handleError');
const notificationService = require('./notification.service');

const getNotifications = async (req, res) => {
    try {
        const data = await notificationService.getNotifications(req.user.id);
        return res.status(200).json({
            success: true,
            message: 'Notifications retrieved successfully',
            unreadCount: data.unreadCount,
            total: data.notifications.length,
            data: data.notifications
        });
    } catch (error) {
        return await handleError(res, 'notificationController', error);
    }
};

const getUnreadCount = async (req, res) => {
    try {
        const data = await notificationService.getUnreadCount(req.user.id);
        return res.status(200).json({ success: true, ...data });
    } catch (error) {
        return await handleError(res, 'notificationController', error);
    }
};

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await notificationService.markAsRead(req.user.id, id);
        return res.status(200).json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        return await handleError(res, 'notificationController', error);
    }
};

const markAllAsRead = async (req, res) => {
    try {
        const data = await notificationService.markAllAsRead(req.user.id);
        return res.status(200).json({
            success: true,
            message: `${data.updated} notification(s) marked as read`
        });
    } catch (error) {
        return await handleError(res, 'notificationController', error);
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await notificationService.deleteNotification(req.user.id, id);
        return res.status(200).json({ success: true, message: 'Notification deleted successfully' });
    } catch (error) {
        return await handleError(res, 'notificationController', error);
    }
};

module.exports = {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
};
