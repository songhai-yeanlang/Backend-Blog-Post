const pool = require('../../configs/db.config');

const findByName = async (name) => {
    const sql = `
        SELECT id, name, created_at, updated_at
        FROM tags
        WHERE name = ?
        LIMIT 1
    `;
    const [rows] = await pool.query(sql, [name]);
    return rows[0];
};

const findById = async (id) => {
    const sql = `
        SELECT id, name, created_at, updated_at
        FROM tags
        WHERE id = ?
        LIMIT 1
    `;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
};

const create = async (name) => {
    const sql = `
        INSERT INTO tags (name)
        VALUES (?)
    `;
    const [result] = await pool.query(sql, [name]);
    return result;
};

const getAll = async () => {
    const sql = `
        SELECT id, name, created_at, updated_at
        FROM tags
        ORDER BY name ASC
    `;
    const [rows] = await pool.query(sql);
    return rows;
};

const updateById = async (id, name) => {
    const sql = `
        UPDATE tags
        SET name = ?
        WHERE id = ?
    `;
    const [result] = await pool.query(sql, [name, id]);
    return result;
};

const deleteById = async (id) => {
    const sql = `
        DELETE FROM tags
        WHERE id = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result;
};

module.exports = {
    findByName,
    findById,
    create,
    getAll,
    updateById,
    deleteById
};
