'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from 'todoz/utils/api';

const MainBody = () => {
	return <main className="h-full w-full"></main>;
};

const createTodo = () => {};

const Page = ({ params }: { params: { id: string } }) => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();

	if (status === 'loading') {
		return <></>;
	} else if (status === 'unauthenticated') {
		return router.push('/auth/signIn');
	} else {
		console.log(params);
		const todos = api.todos.getByUser.useQuery({ userId: params.id });
		console.log(todos);
		const [data, setData] = useState();
		useEffect(() => {}, []);
		return (
			<>
				<div>
					{todos.data ? (
						todos.data.length > 0 ? (
							todos.data.map((item, i) => <div key={`${i}todo`}>{item.title}</div>)
						) : (
							<div>No items found </div>
						)
					) : (
						'Loading...'
					)}
				</div>
			</>
		);
	}
};

export default Page;
