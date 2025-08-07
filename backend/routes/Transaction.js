const express = require('express');
const router = express.Router();
const transactionCtrl = require('../controllers/transactionController');

router.get('/', transactionCtrl.getAll);
router.post('/', transactionCtrl.create);
router.delete('/:id', transactionCtrl.delete);

module.exports = router;
