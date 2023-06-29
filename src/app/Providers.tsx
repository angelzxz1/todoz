'use client';
import { SessionProvider } from 'next-auth/react';
import React, { type ReactNode } from 'react';
import { api } from 'todoz/utils/api';
type ProvidersProps = {
	children: ReactNode;
};
function Providers({ children }: ProvidersProps): JSX.Element {
	return <SessionProvider>{children}</SessionProvider>;
}
const TrpcProvider = api.withTRPC(Providers);

export default TrpcProvider;
