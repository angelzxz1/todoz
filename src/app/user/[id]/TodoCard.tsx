import { type Dispatch, type SetStateAction, useState, type MutableRefObject } from 'react';
import { type todos } from '@prisma/client';
import { api } from 'todoz/utils/api';

type TodoCard = {
	id?: string | number;
	title?: string;
	details?: string;
	completed?: boolean;

	setList: Dispatch<SetStateAction<todos[]>>;
};
const TodoCard = ({ id, title, completed, details = '', setList }: TodoCard) => {
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
			className={`relative rounded-xl border-2 bg-gradient-to-br from-blue-600 to-purple-800 p-4 ${
				completed ? `border-green-400` : `border-red-700`
			} min-h-[18rem] min-w-[12rem]`}
		>
			<button
				onClick={e => {
					console.log(e);
				}}
				className="absolute right-[0] top-[0] flex h-[1.25rem] w-[1.25rem] -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full bg-red-500 leading-none"
			>
				X
			</button>
			<h2 className="flex w-full items-center justify-center border-b border-white">{title}</h2>
			{details}
		</div>
	);
};

export default TodoCard;
