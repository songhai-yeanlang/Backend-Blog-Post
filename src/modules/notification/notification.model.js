const pool = require('../../configs/db.config');

const getUserIdByAccountId = async (accountId) => {
    const sql = `SELECT id FROM users WHERE account_id = ? LIMIT 1`;
    const [rows] = await pool.query(sql, [accountId]);
    return rows[0] ? rows[0].id : null;
};

const getNotificationsByUserId = async (userId) => {
    const sql = `
        SELECT
            cn.id,
            cn.post_id,
            cn.comment_id,
            cn.is_read,
            cn.created_at,
            sender.name   AS sender_name,
            sender.avatar AS sender_avatar,
            sender.account_id AS sender_account_id,
            bp.title      AS post_title
        FROM comment_notifications cn
        LEFT JOIN users sender ON sender.id = cn.sender_id
        LEFT JOIN blog_post bp  ON bp.id   = cn.post_id
        WHERE cn.receiver_id = ?
        ORDER BY cn.created_at DESC
    `;
    const [rows] = await pool.query(sql, [userId]);
    return rows;
};

const getUnreadCount = async (userId) => {
    const sql = `
        SELECT COUNT(*) AS count
        FROM comment_notifications
        WHERE receiver_id = ? AND is_read = 0
    `;
    const [rows] = await pool.query(sql, [userId]);
    return rows[0].count;
};

const getPostOwnerId = async (postId) => {
    const sql = `SELECT user_id FROM blog_post WHERE id = ? LIMIT 1`;
    const [rows] = await pool.query(sql, [postId]);
    return rows[0] ? rows[0].user_id : null;
};

const createNotification = async ({ receiverId, senderId, postId, commentId }) => {
    const insertSql = `
        INSERT INTO comment_notifications (receiver_id, sender_id, post_id, comment_id)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(insertSql, [receiverId, senderId, postId, commentId]);

    // Return populated notification for socket emission
    const selectSql = `
        SELECT
            cn.id,
            cn.post_id,
            cn.comment_id,
            cn.is_read,
            cn.created_at,
            sender.name         AS sender_name,
            sender.avatar       AS sender_avatar,
            sender.account_id   AS sender_account_id,
            bp.title            AS post_title
        FROM comment_notifications cn
        LEFT JOIN users sender ON sender.id = cn.sender_id
        LEFT JOIN blog_post bp  ON bp.id   = cn.post_id
        WHERE cn.id = ?
        LIMIT 1
    `;
    const [rows] = await pool.query(selectSql, [result.insertId]);
    return rows[0] || null;
};

const findNotificationById = async (id) => {
    const sql = `SELECT id, receiver_id FROM comment_notifications WHERE id = ? LIMIT 1`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0] || null;
};

const markAsRead = async (id) => {
    const sql = `UPDATE comment_notifications SET is_read = 1 WHERE id = ?`;
    await pool.query(sql, [id]);
};

const markAllAsRead = async (userId) => {
    const sql = `UPDATE comment_notifications SET is_read = 1 WHERE receiver_id = ? AND is_read = 0`;
    const [result] = await pool.query(sql, [userId]);
    return result.affectedRows;
};

const deleteNotification = async (id) => {
    const sql = `DELETE FROM comment_notifications WHERE id = ?`;
    await pool.query(sql, [id]);
};

module.exports = {
    getUserIdByAccountId,
    getNotificationsByUserId,
    getUnreadCount,
    getPostOwnerId,
    createNotification,
    findNotificationById,
    markAsRead,
    markAllAsRead,
    deleteNotification
};
