const pool = require('../../configs/db.config');

const getUserIdByAccountId = async (accountId) => {
    const sql = `
        SELECT id FROM users WHERE account_id = ? LIMIT 1
    `;
    const [rows] = await pool.query(sql, [accountId]);
    return rows[0] ? rows[0].id : null;
};

const checkPostExists = async (postId) => {
    const sql = `
        SELECT 1 FROM blog_post WHERE id = ? LIMIT 1
    `;
    const [rows] = await pool.query(sql, [postId]);
    return rows.length > 0;
};

const createComment = async (data, connection = pool) => {
    const sql = `
        INSERT INTO comments (post_id, user_id, content)
        VALUES (?, ?, ?)
    `;
    const params = [
        data.postId,
        data.userId,
        data.content
    ];
    const [result] = await connection.query(sql, params);
    return result;
};

const findById = async (id) => {
    const sql = `
        SELECT c.id, c.post_id, c.user_id, c.content, c.created_at, c.updated_at,
               u.name as author_name, u.avatar as author_avatar, u.account_id as author_account_id
        FROM comments c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE c.id = ?
        LIMIT 1
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows[0] || null;
};

const updateComment = async (id, content, connection = pool) => {
    const sql = `
        UPDATE comments
        SET content = ?
        WHERE id = ?
    `;
    const [result] = await connection.query(sql, [content, id]);
    return result;
};

const getAllCommentsByPostId = async (postId) => {
    const sql = `
        SELECT c.id, c.post_id, c.user_id, c.content, c.created_at, c.updated_at,
               u.name as author_name, u.avatar as author_avatar, u.account_id as author_account_id
        FROM comments c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE c.post_id = ?
        ORDER BY c.created_at ASC
    `;
    const [rows] = await pool.query(sql, [postId]);
    return rows;
};

const deleteComment = async (id, connection = pool) => {
    const sql = `DELETE FROM comments WHERE id = ?`;
    const [result] = await connection.query(sql, [id]);
    return result;
};

module.exports = {
    getUserIdByAccountId,
    checkPostExists,
    createComment,
    findById,
    updateComment,
    getAllCommentsByPostId,
    deleteComment
};
