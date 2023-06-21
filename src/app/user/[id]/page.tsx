'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { api } from 'todoz/utils/api';
const Page = ({ params }: { params: { id: string } }) => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	if (status === 'loading') {
		return <></>;
	} else if (status === 'unauthenticated') {
		return router.push('/auth/signIn');
	} else {
		console.log(params);
		const user = api.users.getUser.useQuery({ id: params.id });
		return <div>{user.data ? user.data.name : ''}</div>;
	}
};

export default Page;
