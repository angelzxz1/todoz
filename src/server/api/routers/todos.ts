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

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todos.findMany();
  }),
  getByCompleted: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todos.findMany({
      where: {
        completed: true,
      },
    });
  }),
});
