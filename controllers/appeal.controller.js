const {prisma} = require("../prisma/prisma-client")
const {appealService, feedbackService} = require("../services");
const StatusType = require("../enum");

const appealController = {
	create: async (req, res) => {
		try {
			const { theme, content } = req.body
			const appeal = await appealService.create({theme, content})

			return res.status(200).send(appeal)
		} catch (e) {
			console.log("Error in create appeal", e)
			res.status(500).json({ message: "Error in create appeal" })
		}
	},

	getAll: async (req, res) => {
		try {
			const appeals = await appealService.getAll(req.query)

			res.status(200).send(appeals)
		} catch (e) {
			console.log("Error in getAll appeal", e)
			res.status(500).json({ message: "Error in getAll appeal" })
		}
	},

	patchWork: async (req, res) => {
		try {
			const id = parseInt(req.params.id)

			const appeal = await appealService.updateStatus(id, StatusType.WORKED)

			return res.status(200).send(appeal)
		} catch (e) {
			console.log("Error in patchWork appeal", e)
			res.status(500).json({ message: "Error in patchWork appeal" })
		}
	},

	patchCompleted: async (req, res) => {
		try {
			const id = parseInt(req.params.id)
			const { content } = req.body

			const appeal = await appealService.updateStatus(id, StatusType.COMPLETED, content)
			await feedbackService.create(id, { content, type: StatusType.COMPLETED })

			return res.status(200).send(appeal)
		} catch (e) {
			console.log("Error in patchCompleted appeal", e)
			res.status(500).json({ message: "Error in patchCompleted appeal" })
		}
	},

	patchCanceled: async (req, res) => {
		try {
			const id = parseInt(req.params.id)
			const { content } = req.body

			const appeal = await appealService.updateStatus(id, StatusType.CANCELED, content)
			await feedbackService.create(id, { content, type: StatusType.CANCELED })

			return res.status(200).send(appeal)
		} catch (e) {
			console.log("Error in patchCanceled appeal", e)
			res.status(500).json({ message: "Error in patchCanceled appeal" })
		}
	},

	patchWorkToCanceled: async (req, res) => {
		try {
			const appeals = await appealService.getAll({ status: StatusType.WORKED })
			const { content } = req.body

			const updateAppeals = []
			for (const appeal of appeals) {
				updateAppeals.push(await appealService.updateStatus(appeal.id, StatusType.CANCELED))
				await feedbackService.create(appeal.id, { content, type: StatusType.CANCELED })
			}

			res.status(200).send(updateAppeals)
		} catch (e) {
			console.log("Error in patchCanceled appeal", e)
			res.status(500).json({ message: "Error in patchCanceled appeal" })
		}
	},
}

module.exports = appealController;