(function () {
    const { Pool } = require('pg');

    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || '5432'),
    });

    exports.connectToDatabase = async function () {
        try {
            await pool.connect();
            console.log('Connected to PostgreSQL database');
            await initTables();
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    };

    async function initTables() {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(10) PRIMARY KEY DEFAULT 'q-' || LPAD(nextval('question_id_seq')::text, 4, '0'),                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS questions (
                id VARCHAR(10) PRIMARY KEY DEFAULT 'quiz-' || LPAD(nextval('quiz_id_seq')::text, 4, '0'),
                question_text TEXT NOT NULL,
                options JSONB NOT NULL,
                correct_answer CHAR(1) NOT NULL,
                category VARCHAR(100),
                difficulty INTEGER DEFAULT 1
            )
        `);


        await pool.query(`
        CREATE TABLE IF NOT EXISTS answers (
            id SERIAL PRIMARY KEY,
            quiz_result_id VARCHAR(10) REFERENCES quiz_results(id),
            question_id VARCHAR(10) REFERENCES questions(id),
            user_answer CHAR(1) NOT NULL,
            is_correct BOOLEAN NOT NULL
        )
    `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS answers (
                id SERIAL PRIMARY KEY,
                quiz_result_id INTEGER REFERENCES quiz_results(id),
                question_id INTEGER REFERENCES questions(id),
                user_answer CHAR(1) NOT NULL,
                is_correct BOOLEAN NOT NULL
            )
        `);

        console.log('Database tables initialized');

        await insertSampleQuestions();
    }

    async function insertSampleQuestions() {
        try {
            const questionCheck = await pool.query('SELECT COUNT(*) FROM questions');
            if (parseInt(questionCheck.rows[0].count) === 0) {
                const nigerianQuestions = [
                    {
                        question_text: "What is the capital city of Nigeria?",
                        options: { A: "Lagos", B: "Abuja", C: "Kano", D: "Ibadan" },
                        correct_answer: "B",
                        category: "Geography",
                        difficulty: 1
                    },
                    {
                        question_text: "Which year did Nigeria gain independence?",
                        options: { A: "1956", B: "1960", C: "1963", D: "1970" },
                        correct_answer: "B",
                        category: "History",
                        difficulty: 1
                    },
                    {
                        question_text: "What is the official currency of Nigeria?",
                        options: { A: "Naira", B: "Cedi", C: "Shilling", D: "Franc" },
                        correct_answer: "A",
                        category: "Economics",
                        difficulty: 1
                    },
                    {
                        question_text: "Which Nigerian musician is known as the 'African Giant'?",
                        options: { A: "Wizkid", B: "Davido", C: "Burna Boy", D: "Olamide" },
                        correct_answer: "C",
                        category: "Music",
                        difficulty: 2
                    },
                    {
                        question_text: "What is the most widely spoken language in Nigeria?",
                        options: { A: "Yoruba", B: "Hausa", C: "Igbo", D: "English" },
                        correct_answer: "D",
                        category: "Language",
                        difficulty: 1
                    },
                    {
                        question_text: "Which Nigerian city is known as the 'Centre of Excellence'?",
                        options: { A: "Abuja", B: "Port Harcourt", C: "Lagos", D: "Enugu" },
                        correct_answer: "C",
                        category: "Geography",
                        difficulty: 2
                    },
                    {
                        question_text: "Who was the first President of Nigeria?",
                        options: { A: "Nnamdi Azikiwe", B: "Obafemi Awolowo", C: "Tafawa Balewa", D: "Yakubu Gowon" },
                        correct_answer: "A",
                        category: "History",
                        difficulty: 2
                    },
                    {
                        question_text: "Which of these is a popular Nigerian dish?",
                        options: { A: "Jollof Rice", B: "Biryani", C: "Paella", D: "Risotto" },
                        correct_answer: "A",
                        category: "Food",
                        difficulty: 1
                    },
                    {
                        question_text: "What is the name of Nigeria's highest national honor?",
                        options: { A: "GCFR", B: "CON", C: "OFR", D: "MFR" },
                        correct_answer: "A",
                        category: "Politics",
                        difficulty: 3
                    },
                    {
                        question_text: "Which Nigerian author won the Nobel Prize in Literature?",
                        options: { A: "Chinua Achebe", B: "Wole Soyinka", C: "Chimamanda Adichie", D: "Ben Okri" },
                        correct_answer: "B",
                        category: "Literature",
                        difficulty: 2
                    },
                    {
                        question_text: "What is the largest ethnic group in Nigeria?",
                        options: { A: "Yoruba", B: "Igbo", C: "Hausa-Fulani", D: "Ijaw" },
                        correct_answer: "C",
                        category: "Culture",
                        difficulty: 2
                    },
                    {
                        question_text: "Which Nigerian football player won the African Player of the Year award?",
                        options: { A: "Jay-Jay Okocha", B: "Kanu Nwankwo", C: "Rashidi Yekini", D: "All of the above" },
                        correct_answer: "D",
                        category: "Sports",
                        difficulty: 2
                    },
                    {
                        question_text: "What is the name of Nigeria's film industry?",
                        options: { A: "Nollywood", B: "Bollywood", C: "Hollywood", D: "Kannywood" },
                        correct_answer: "A",
                        category: "Entertainment",
                        difficulty: 1
                    },
                    {
                        question_text: "Which river is the longest in Nigeria?",
                        options: { A: "River Niger", B: "River Benue", C: "River Kaduna", D: "River Cross" },
                        correct_answer: "A",
                        category: "Geography",
                        difficulty: 2
                    },
                    {
                        question_text: "What is the current population of Nigeria (approx)?",
                        options: { A: "100 million", B: "150 million", C: "200 million", D: "250 million" },
                        correct_answer: "C",
                        category: "Demographics",
                        difficulty: 2
                    }
                ];

                for (const question of nigerianQuestions) {
                    await pool.query(
                        'INSERT INTO questions (question_text, options, correct_answer, category, difficulty) VALUES ($1, $2, $3, $4, $5)',
                        [question.question_text, question.options, question.correct_answer, question.category, question.difficulty]
                    );
                }
                console.log('15 Nigerian sample questions inserted');
            }
        } catch (error) {
            console.error('Error inserting sample questions:', error);
        }
    }

    exports.pool = pool;
})();