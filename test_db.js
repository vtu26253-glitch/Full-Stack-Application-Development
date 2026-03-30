const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    try {
        console.log("Attempting to connect with:");
        console.log("Host:", process.env.DB_HOST || 'localhost');
        console.log("User:", process.env.DB_USER || 'root');
        console.log("Database:", process.env.DB_NAME || 'online_exam_db');

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'online_exam_db'
        });
        console.log("Successfully connected to the database.");

        const [rows] = await connection.execute('SHOW TABLES');
        console.log("Tables:", rows);

        await connection.end();
    } catch (error) {
        console.error("Connection failed with error:");
        console.error(error);
    }
}

testConnection();
