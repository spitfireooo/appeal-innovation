const express = require('express')
const {appealController} = require("../controllers");

const router = express.Router()

router.post('/', appealController.create)
router.get('/', appealController.getAll)
router.patch('/:id/to-work', appealController.patchWork)
router.patch('/:id/to-cancel', appealController.patchCanceled)
router.patch('/:id/to-completed', appealController.patchCompleted)
router.patch('/to-cancel', appealController.patchWorkToCanceled)

module.exports = router