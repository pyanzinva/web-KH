const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
    res.send('Hello World!');
});
router.get('/:id', (req, res, next) => {
    response.send('user ' + request.params.id)
});
router.post('/', (req, res, next) => {
    res.json(req.body);
});

module.exports = router