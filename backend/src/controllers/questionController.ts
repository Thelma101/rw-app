(function () { const quizModel = require('../models/quizModel');

const { 
    getAllQuestions, 
    getQuestionById, 
    createQuestion, 
    updateQuestion, 
    deleteQuestion 
} = require('../models/quizModel');
const { questionSchema } = require('../middleware/validation');

exports.getQuestions = async function (req, res) {
    try {
        const questions = await quizModel.getAllQuestions();
        res.json(questions);
    } catch (error) {
        console.error('Get questions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getQuestion = async function (req, res) {
    try {
        const question = await getQuestionById(parseInt(req.params.id));
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        console.error('Get question error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createQuestion = async function (req, res) {
    try {
        const { error } = questionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const question = await createQuestion(req.body);
        res.status(201).json(question);
    } catch (error) {
        console.error('Create question error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateQuestion = async function (req, res) {
    try {
        const { error } = questionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const question = await updateQuestion(parseInt(req.params.id), req.body);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        console.error('Update question error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteQuestion = async function (req, res) {
    try {
        const deleted = await deleteQuestion(parseInt(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Delete question error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}} ());