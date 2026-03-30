const pool = require('./config/db');

async function run() {
    try {
        console.log('Seeding data...');
        // Insert admin
        const [admin] = await pool.query("INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@test.com', 'a', 'admin')");
        const adminId = admin.insertId || 1;
        
        // Insert student
        const [student] = await pool.query("INSERT INTO users (name, email, password, role) VALUES ('Student', 'student@test.com', 'a', 'student')");
        const studentId = student.insertId || 2;
        
        // Insert exam
        const [exam] = await pool.query("INSERT INTO exams (title, description, duration_minutes, created_by) VALUES ('Test Exam', 'Test', 60, ?)", [adminId]);
        const examId = exam.insertId || 1;
        
        // Insert question
        await pool.query("INSERT INTO questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES (?, 'Q1', 'A', 'B', 'C', 'D', 'a')", [examId]);
        
        console.log('Data seeded. Running query...');
        
        // Run student query
        const [availableExams] = await pool.query(`
            SELECT e.*, COUNT(q.id) as question_count 
            FROM exams e 
            JOIN questions q ON e.id = q.exam_id 
            WHERE e.id NOT IN (SELECT exam_id FROM results WHERE student_id = ?)
            GROUP BY e.id
        `, [studentId]);
        
        console.log('Available Exams:', availableExams);
        
    } catch (e) {
        console.error('Error:', e);
    }
}
run();
