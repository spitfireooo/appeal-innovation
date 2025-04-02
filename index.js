const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 6080;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', require('./routes'))

try {
	app.listen(PORT, _ => {
		console.log(`Server listening on port: ${PORT}`);
	})
} catch (e) {
	console.log(e)
}