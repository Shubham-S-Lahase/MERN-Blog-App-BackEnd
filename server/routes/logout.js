const express = require('express');

const router = express.Router();
router.use(express.json());

router.post('/Logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

module.exports = router;