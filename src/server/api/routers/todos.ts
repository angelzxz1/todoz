import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from 'todoz/server/api/trpc';

export const todosRouter = createTRPCRouter({
	hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		return {
			greeting: `Hello ${input.text}`,
		};
	}),

	getAll: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.todos.findMany();
	}),
	getByCompleted: protectedProcedure.query(({ ctx }) => {
		return ctx.prisma.todos.findMany({
			where: {
				completed: true,
			},
		});
	}),
	// addTodo:protectedProcedure.input(z.object({title:z.string()})).mutation(({input})=>{

	// }),
	getByUser: protectedProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.todos.findMany({
			where: {
				userId: input.userId,
			},
		});
	}),
	addTodo: protectedProcedure
		.input(
			z.object({
				title: z.string(),
				userID: z.string(),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.todos.create({
				data: {
					title: input.title,
					completed: false,
					userId: input.userID,
				},
			});
		}),
});
