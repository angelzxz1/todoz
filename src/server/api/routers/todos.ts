import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from 'todoz/server/api/trpc';

export const todosRouter = createTRPCRouter({
	hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
		return {
			greeting: `Hello ${input.text}`,
		};
	}),
	getByCompleted: protectedProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.todos.findMany({
			where: {
				userId: input.userId,
				completed: true,
			},
		});
	}),
	getByNotCompleted: protectedProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.todos.findMany({
			where: {
				userId: input.userId,
				completed: false,
			},
		});
	}),
	getAll: protectedProcedure.input(z.object({ userId: z.string() })).query(({ ctx, input }) => {
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
				details: z.string(),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.todos.create({
				data: {
					title: input.title,
					completed: false,
					details: input.details,
					userId: input.userID,
				},
			});
		}),
	removeTodo: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.todos.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
