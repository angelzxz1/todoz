'use client';
import { SessionProvider } from 'next-auth/react';
import React, { type ReactNode } from 'react';
import { api } from 'todoz/utils/api';
interface Props {
	children: ReactNode;
}
function Providers({ children }: Props): JSX.Element {
	return <SessionProvider>{children}</SessionProvider>;
}

export default api.withTRPC(Providers);
