const db = require('./database');

exports.createUser = async function (name, email, password) {
  const result = await db.pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, password]
  );
  return result.rows[0];
};

exports.findUserByEmail = async function (email) {
  const result = await db.pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

exports.getAllQuestions = async function () {
    const result = await db.pool.query('SELECT * FROM questions ORDER BY id');
    return result.rows;
};

exports.getQuestionById = async function (id) {
    const result = await db.pool.query('SELECT * FROM questions WHERE id = $1', [id]);
    return result.rows[0];
};

exports.createQuestion = async function (questionData) {
    const { question_text, options, correct_answer, category, difficulty } = questionData;
    const result = await db.pool.query(
        'INSERT INTO questions (question_text, options, correct_answer, category, difficulty) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [question_text, options, correct_answer, category, difficulty || 1]
    );
    return result.rows[0];
};

exports.updateQuestion = async function (id, questionData) {
    const { question_text, options, correct_answer, category, difficulty } = questionData;
    const result = await db.pool.query(
        'UPDATE questions SET question_text = $1, options = $2, correct_answer = $3, category = $4, difficulty = $5 WHERE id = $6 RETURNING *',
        [question_text, options, correct_answer, category, difficulty, id]
    );
    return result.rows[0];
};

exports.deleteQuestion = async function (id) {
    const result = await db.pool.query('DELETE FROM questions WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
};

exports.getQuestions = async function (category, difficulty, limit = 10) {
    let query = 'SELECT * FROM questions';
    const params = [];
    
    if (category || difficulty) {
        query += ' WHERE';
        const conditions = [];
        
        if (category) {
            conditions.push(` category = $${params.length + 1}`);
            params.push(category);
        }
        
        if (difficulty) {
            conditions.push(` difficulty = $${params.length + 1}`);
            params.push(difficulty);
        }
        
        query += conditions.join(' AND');
    }
    
    query += ` ORDER BY RANDOM() LIMIT $${params.length + 1}`;
    params.push(limit);
    
    const result = await db.pool.query(query, params);
    return result.rows;
};

exports.getQuestionsForQuiz = async function (limit = 10) {
    const result = await db.pool.query(
        'SELECT * FROM questions ORDER BY RANDOM() LIMIT $1',
        [limit]
    );
    return result.rows;
};

exports.saveQuizResult = async function (userId, score, totalQuestions, timeTaken, answers) {
    const client = await db.pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const quizResult = await client.query(
            `INSERT INTO quiz_results (user_id, score, total_questions, time_taken) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [userId, score, totalQuestions, timeTaken]
        );
        
        const quizResultId = quizResult.rows[0].id;
        
        // Save each answer
        for (const answer of answers) {
            await client.query(
                `INSERT INTO answers (quiz_result_id, question_id, user_answer, is_correct) 
                 VALUES ($1, $2, $3, $4)`,
                [quizResultId, answer.questionId, answer.userAnswer, answer.isCorrect]
            );
        }
        
        await client.query('COMMIT');
        return quizResultId;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};