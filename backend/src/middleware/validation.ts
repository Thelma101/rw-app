const Joi = require('joi');

exports.registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.startQuizSchema = Joi.object({
    category: Joi.string().optional(),
    difficulty: Joi.number().min(1).max(5).optional(),
    limit: Joi.number().min(1).max(50).optional()
});

exports.submitQuizSchema = Joi.object({
    answers: Joi.array().items(Joi.object({
        questionId: Joi.number().required(),
        userAnswer: Joi.string().length(1).required()
    })).required(),
    timeTaken: Joi.number().required()
});


exports.registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

// Question schemas
exports.questionSchema = Joi.object({
    question_text: Joi.string().min(5).required(),
    options: Joi.object().pattern(
        Joi.string().length(1), 
        Joi.string().min(1)
    ).min(4).max(4).required(),
    correct_answer: Joi.string().length(1).required(),
    category: Joi.string().optional(),
    difficulty: Joi.number().min(1).max(5).optional()
});

// Quiz schemas
exports.startQuizSchema = Joi.object({
    limit: Joi.number().min(1).max(50).optional()
});

exports.submitQuizSchema = Joi.object({
    answers: Joi.array().items(Joi.object({
        questionId: Joi.number().required(),
        userAnswer: Joi.string().length(1).required(),
        isCorrect: Joi.boolean().required()
    })).required(),
    timeTaken: Joi.number().required()
});