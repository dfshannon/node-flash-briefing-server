import mysql from 'mysql';
import util from 'util';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

pool.getConnection((err, connection) => {
    if (err && connection) {
        connection.release();
    }
});

pool.query = util.promisify(pool.query); // Magic happens here.

/*
pool.on('release', (connection) => {
    console.log('Connection %d released', connection.threadId);
});
*/
export default pool;
