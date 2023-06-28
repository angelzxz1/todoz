'use client';
import { type todos } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { api } from 'todoz/utils/api';
import CreateTodo from './CreateTodo';
import TodoCard from './TodoCard';

type MainBodyProps = {
	id: string;
};
const MainBody = ({ id }: MainBodyProps) => {
	const { data, isLoading: todosLoading } = api.todos.getAll.useQuery({ userId: id });
	const constraintsRef = useRef(null);
	const [list, setList] = useState<todos[]>([]);
	useEffect(() => {
		setList(data ? [...data] : []);
	}, [data]);
	if (todosLoading) {
		return <div className="flex grow">Loading...</div>;
	}
	if (!data) return <div>Something went wrong</div>;
	return (
		<main className="h-full w-full" ref={constraintsRef}>
			<CreateTodo userId={id} setList={setList} constraintsRef={constraintsRef} />
			<div className="w-full">
				{list.length > 0 ? (
					<div className="flex gap-2 overflow-x-auto py-2">
						{list.map(item => (
							<TodoCard
								id={item.id}
								completed={item.completed}
								key={item.id}
								title={item.title}
								details={item.details}
								setList={setList}
							/>
						))}
					</div>
				) : (
					<div className="flex h-full w-full flex-col items-center justify-center">
						<h1 className="rounded-xl bg-purple-500 px-2 text-[4rem]">
							No items found, You&apos;re all up to date!{' '}
						</h1>
					</div>
				)}
			</div>
		</main>
	);
};

const Page = ({ params }: { params: { id: string } }) => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	if (status === 'loading') {
		return <></>;
	} else if (status === 'unauthenticated') {
		return router.push('/auth/signIn');
	} else {
		return <MainBody id={params.id} />;
	}
};

export default Page;
