const pool = require('./config/db');

async function seed() {
    try {
        console.log('Inserting a demo exam...');
        
        // Find an admin (user id 5)
        const adminId = 5; 
        
        const [result] = await pool.query(
            "INSERT INTO exams (title, description, duration_minutes, created_by) VALUES (?, ?, ?, ?)",
            ['JavaScript Basics', 'A test to check your basic JS knowledge.', 30, adminId]
        );
        
        const examId = result.insertId;
        console.log('Exam inserted with ID:', examId);
        
        // Add questions
        await pool.query(
            "INSERT INTO questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [examId, 'What does HTML stand for?', 'Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Markup Language', 'a']
        );
        
        await pool.query(
            "INSERT INTO questions (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [examId, 'What does CSS stand for?', 'Colorful Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'c']
        );
        
        console.log('Questions inserted successfully!');
    } catch(err) {
        console.error(err);
    }
}
seed();
