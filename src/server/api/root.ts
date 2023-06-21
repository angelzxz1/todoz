import { usersRouter } from 'todoz/server/api/routers/users';
import { todosRouter } from 'todoz/server/api/routers/todos';

import { createTRPCRouter } from 'todoz/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	users: usersRouter,
	todos: todosRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
