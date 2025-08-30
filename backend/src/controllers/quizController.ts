const quizModel = require('../models/quizModel');
const { startQuizSchema, submitQuizSchema } = require('../middleware/validation');

exports.startQuiz = async function (req, res) {
    try {
        const { error } = startQuizSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { limit = 10 } = req.body;
        const questions = await quizModel.getQuestionsForQuiz(limit);
        
        res.json({ questions });
    } catch (error) {
        console.error('Start quiz error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.submitQuiz = async function (req, res) {
    try {
        const { error } = submitQuizSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { answers, timeTaken } = req.body;
        
        // Calculate score
        const score = answers.filter(answer => answer.isCorrect).length;

        const quizId = await quizModel.saveQuizResult(
            req.userId,
            score,
            answers.length,
            timeTaken,
            answers
        );
        
        res.json({
            score,
            total: answers.length,
            timeTaken,
            quizId
        });
    } catch (error) {
        console.error('Submit quiz error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};