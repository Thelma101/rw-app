(function () {
    const express = require('express');
    const { 
        getQuestions, 
        getQuestion, 
        createQuestion, 
        updateQuestion, 
        deleteQuestion 
    } = require('../controllers/questionController');
    const { authenticateToken } = require('../middleware/auth');
    
    const router = express.Router();
    
    // Protect all question routes
    router.use(authenticateToken);
    
    router.get('/', getQuestions);
    router.get('/:id', getQuestion);
    router.post('/', createQuestion);
    router.put('/:id', updateQuestion);
    router.delete('/:id', deleteQuestion);
    
    module.exports = router;
})();