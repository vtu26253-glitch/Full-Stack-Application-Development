const fs = require('fs');
const pool = require('./config/db');

async function check() {
    try {
        const [users] = await pool.query('SELECT * FROM users;');
        const [exams] = await pool.query('SELECT * FROM exams;');
        const [questions] = await pool.query('SELECT * FROM questions;');
        const [results] = await pool.query('SELECT * FROM results;');
        
        const dump = { users, exams, questions, results };
        fs.writeFileSync('dump.json', JSON.stringify(dump, null, 2));
    } catch(err) {
        console.error(err);
    }
}
check();
