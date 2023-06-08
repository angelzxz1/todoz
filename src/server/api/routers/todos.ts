import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "todoz/server/api/trpc";

export const todosRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
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
});
