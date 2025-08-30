(function () {
    const express = require('express');
    const { startQuiz, submitQuiz } = require('../controllers/quizController');
    const { authenticateToken } = require('../middleware/auth');

    const router = express.Router();

    router.use(authenticateToken);

    // Protect all quiz routes
    router.use(authenticateToken);

    router.post('/start', startQuiz);
    router.post('/submit', submitQuiz);

    module.exports = router;
})();
