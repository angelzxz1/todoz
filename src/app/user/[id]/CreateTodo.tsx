import { IconMinus, IconPlus } from '@tabler/icons-react';
import { api } from 'todoz/utils/api';
import { motion } from 'framer-motion';
import { type todos } from '@prisma/client';
import { type Dispatch, type SetStateAction, useState, type MutableRefObject } from 'react';

type SwitchProps = {
	setIsOn: Dispatch<SetStateAction<boolean>>;
	isOn: boolean;
	className?: string;
};
const Switch = ({ setIsOn, isOn, className = '' }: SwitchProps): JSX.Element => {
	return (
		<div
			className={`flex h-4 w-8 cursor-pointer items-center justify-between rounded-full ${
				isOn ? `bg-green-400` : `bg-gray-400`
			} ${className}`}
			onClick={() => {
				setIsOn(prev => !prev);
			}}
		>
			<motion.div
				className="h-4 w-4 rounded-full bg-white"
				animate={{
					x: isOn ? 16 : 0,
				}}
				transition={{
					type: 'spring',
					bounce: 0.5,
				}}
			></motion.div>
		</div>
	);
};

type CreateTodoProps = {
	userId: string;
	setList: Dispatch<SetStateAction<todos[]>>;
	constraintsRef: MutableRefObject<null>;
};
const CreateTodo = ({ userId, setList, constraintsRef }: CreateTodoProps) => {
	const [title, setTitle] = useState<string>('');
	const [details, setDetails] = useState<string>('');
	const [isOn, setIsOn] = useState<boolean>(false);
	const [isOptional, setIsOptional] = useState<boolean>(false);

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
		<motion.div
			className="fixed right-0 top-1/2 z-10 w-[16rem] -translate-y-1/2 rounded-lg border border-white bg-[#ffffff55] p-4 backdrop-blur-lg"
			drag={isOn}
			dragConstraints={constraintsRef}
		>
			<div className="relative flex items-center justify-center border-b pb-2">
				<div className="">{isOn ? 'Movable' : 'Not movable'}</div>

				<Switch isOn={isOn} setIsOn={setIsOn} className="absolute right-0" />
			</div>
			<div className="z-20 flex h-full w-full flex-col items-center justify-center">
				<input
					placeholder="Title"
					className="mb-4 w-full border-b bg-transparent p-2 text-center"
					value={title}
					onChange={e => {
						setTitle(e.target.value);
					}}
				/>
				<textarea
					name=""
					id=""
					rows={5}
					className="mb-4 w-full rounded-xl border border-white bg-transparent p-4 text-white"
					value={details}
					onChange={e => {
						setDetails(e.target.value);
					}}
				></textarea>
				<div className="mb-4 flex w-full items-center justify-start">
					<label className="mr-4">Is Optional?</label>
					<Switch isOn={isOptional} setIsOn={setIsOptional} />
				</div>
				<button
					className="hover: flex w-full items-center justify-center rounded-full bg-black transition-shadow hover:shadow-button hover:shadow-purple-900"
					onClick={() => {
						if (title === '' && details === '')
							return alert('Title and Details are empty, add some content');
						if (title === '') return alert('Add a title my friend');
						if (isOptional)
							return alert(
								"Details are not optional, if that's not the case, please mark it as optional",
							);
						if (details === '') return alert('Give some deatils for this task');

						return mutate({ title: title, userID: userId, details: details });
					}}
				>
					Add
				</button>
			</div>
			<div className="flex w-full items-center justify-center">{isPosting ? 'Adding todo...' : ''}</div>
		</motion.div>
	);
};
export default CreateTodo;
