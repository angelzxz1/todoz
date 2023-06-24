'use client';
import { todos } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { api } from 'todoz/utils/api';

type MainBodyProps = {
	id: string;
};
const MainBody = ({ id }: MainBodyProps) => {
	const { data, isLoading: todosLoading } = api.todos.getByUser.useQuery({ userId: id });
	const [list, setList] = useState<todos[]>([]);
	useEffect(() => {
		console.log('rerendering');
		setList(data ? [...data] : []);
	}, [data]);
	if (todosLoading) {
		return <div className="flex grow">Loading...</div>;
	}
	if (!data) return <div>Something went wrong</div>;

	return (
		<main className="h-full w-full ">
			<CreateTodo userId={id} setList={setList} />
			{list.length > 0 ? (
				<div className="flex gap-2 overflow-x-auto">
					{list.map(item => (
						<TodoCard id={item.id} completed={item.completed} key={item.id} title={item.title} />
					))}
				</div>
			) : (
				<div className="mt-[4rem] flex w-full flex-col items-center justify-center">
					<h1 className="rounded-xl bg-purple-500 px-2 text-[4rem]">
						No items found, You&apos;re all up to date!{' '}
					</h1>
					<div className="flex flex-col text-black">
						<h2 className="text-[2rem] text-white">Try adding some tasks!</h2>
						<input type="text" className="mb-4 w-full rounded-lg px-4 py-2" placeholder="Title" />
						<textarea
							name=""
							id=""
							cols={30}
							rows={10}
							className="mb-4 w-full rounded-lg px-4 py-2"
							placeholder="Content"
						></textarea>
						<button
							onClick={() => {
								return {};
							}}
							className="hover: rounded-lg bg-green-600 p-2 text-white"
						>
							Add
						</button>
					</div>
				</div>
			)}
		</main>
	);
};
type TodoCard = {
	id?: string | number;
	title?: string;
	completed?: boolean;
};
const TodoCard = ({ id, title, completed }: TodoCard) => {
	return (
		<div key={id} className="rounded-xl bg-teal-400 p-4">
			{title}
		</div>
	);
};

type CreateTodoProps = {
	userId: string;
	setList: Dispatch<SetStateAction<todos[]>>;
};
const CreateTodo = ({ userId, setList }: CreateTodoProps) => {
	const [title, setTitle] = useState<string>('');
	const { mutate, isLoading: isPosting } = api.todos.addTodo.useMutation({
		onSuccess: e => {
			setList(prev => {
				return [...prev, e];
			});
			setTitle('');
		},
		onError: e => {
			console.log(e);
		},
	});
	return (
		<div className="fixed right-0 h-[24rem] w-[16rem] rounded-lg border border-white bg-[#ffffff55] backdrop-blur-lg">
			<input
				placeholder="title"
				className="w-full border-b bg-transparent p-2 text-center"
				value={title}
				onChange={e => {
					setTitle(e.target.value);
				}}
			/>
			<button
				className="flex w-full items-center justify-center"
				onClick={() => mutate({ title: title, userID: userId })}
			>
				Add
			</button>
		</div>
	);
};

const Page = ({ params }: { params: { id: string } }) => {
	const { data: sessionData, status } = useSession();
	const router = useRouter();
	api.todos.getByUser.useQuery({ userId: params.id });
	if (status === 'loading') {
		return <></>;
	} else if (status === 'unauthenticated') {
		return router.push('/auth/signIn');
	} else {
		api.todos.getByUser.useQuery({ userId: params.id });
		return <MainBody id={params.id} />;
	}
};

export default Page;
