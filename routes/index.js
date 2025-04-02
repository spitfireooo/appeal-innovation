const express = require('express')

const appealRouter = require("./appeal.router");

const router = express.Router()

router.use('/appeal', appealRouter)

module.exports = router