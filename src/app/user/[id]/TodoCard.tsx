import { type Dispatch, type SetStateAction, useState, type MutableRefObject } from 'react';
import { type todos } from '@prisma/client';
import { api } from 'todoz/utils/api';

type TodoCard = {
	id: string;
	title?: string;
	details?: string;
	completed?: boolean;
	bgColor: string;
	setList: Dispatch<SetStateAction<todos[]>>;
};
const TodoCard = ({ id, title, completed, details = '', bgColor, setList }: TodoCard) => {
	const [confirmation, setConfirmation] = useState<{ confirm: boolean; showConfirm: boolean }>({
		confirm: false,
		showConfirm: false,
	});
	const {
		mutate,
		isSuccess: isRemoved,
		isLoading: isRemoving,
		isError,
	} = api.todos.removeTodo.useMutation({
		onSuccess: e => {
			setList(prev => {
				return [...prev.filter(item => item.id !== id)];
			});
		},
		onError: e => {
			console.log(e);
		},
	});
	return (
		<div
			key={id}
			className={`relative rounded-xl border-2 p-4 text-black ${
				completed ? `border-green-400` : `border-red-700`
			} min-h-[18rem] min-w-[12rem]`}
			style={{ background: bgColor }}
		>
			<button
				onClick={e => {
					mutate({ id: id });
				}}
				className="absolute right-[0] top-[0] flex h-[1.25rem] w-[1.25rem] -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-red-500 leading-none"
			>
				X
			</button>
			<h2 className="flex w-full items-center justify-center border-b border-black">{title}</h2>
			{details}
		</div>
	);
};

export default TodoCard;
