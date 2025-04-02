const {prisma} = require("../prisma/prisma-client");
const StatusType = require("../enum");
const {appealService} = require("./index");

const feedbackService = {
	create: async (id, { content, type }) => {
		if (!content || !type)
			throw new Error('All fields are required');

		if (![StatusType.NEW,
			StatusType.WORKED,
			StatusType.CANCELED,
			StatusType.COMPLETED
		].includes(type)) {
			throw new Error('Bad type');
		}

		// If you need only one feedback
		// const feedbackExist = await prisma.appealFeedback.findFirst({where: {appealId: id}});
		// if (feedbackExist) {
		// 	await prisma.appealFeedback.deleteMany({
		// 		where: { appealId: id },
		// 	})
		// }

		return prisma.appealFeedback.create({
			data: {
				content,
				type,
				appealId: id
			}
		});
	}
}

module.exports = feedbackService;