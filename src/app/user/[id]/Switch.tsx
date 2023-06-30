import { type Dispatch, type SetStateAction, useState, type MutableRefObject } from 'react';
import { motion } from 'framer-motion';

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

export default Switch