const {prisma} = require("../prisma/prisma-client");
const StatusType = require("../enum");

const appealService = {
	create: async ({theme, content}) => {
		if (!theme || !content)
			throw new Error('All fields are required');

		return prisma.appeal.create({
			data: {
				theme,
				content
			}
		});
	},

	getAll: async ({
		search,
		sortDirect,
		sortParam,
		status,
		limit,
		skip
	}) => {
		return prisma.appeal.findMany({
			include: {
				appealFeedback: true
			},
			where: {
				theme: {
					contains: search || "",
					mode: "insensitive"
				},
				...(
					status &&
					[StatusType.NEW,
						StatusType.WORKED,
						StatusType.CANCELED,
						StatusType.COMPLETED
					].includes(status.toUpperCase()) ? { status: status.toUpperCase() } : {}
				)
			},
			orderBy: {
				[sortParam || 'createdAt']: !!+sortDirect ? 'asc' : 'desc'
			},
			take: +limit || 25,
			skip: skip ? (+skip * +limit) : 0,
		})
	},

	updateStatus: async (id, type, content) => {
		if (isNaN(id)) {
			throw new Error('Invalid user ID');
		}

		const appealExist = await prisma.appeal.findFirst({ where: { id } })
		if (!appealExist)
			throw new Error('Appeal not exist');

		// 2 method for create feedback from appeal service
		// if (
		// 	type  === StatusType.CANCELED ||
		// 	type === StatusType.COMPLETED
		// ) {
		// 	await feedbackService.create(id, { content, type })
		// }

		return prisma.appeal.update({
			where: { id },
			data: {
				status: type
			}
		})
	}
}

module.exports = appealService;