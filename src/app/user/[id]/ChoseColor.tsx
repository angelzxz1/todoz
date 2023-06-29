import type { Dispatch, SetStateAction } from 'react';

type ColorButtonProps = {
	color: string;
	setColor: Dispatch<SetStateAction<string>>;
	setToggleColor: Dispatch<SetStateAction<boolean>>;
};
const ColorButton = ({ color, setColor, setToggleColor }: ColorButtonProps) => {
	return (
		<div
			className="h-8 w-8 cursor-pointer rounded-full border border-white"
			onClick={() => {
				setColor(color);
				setToggleColor(prev => !prev);
			}}
			style={{ background: color }}
		/>
	);
};
export type ChooseColorProps = {
	setColor: Dispatch<SetStateAction<string>>;
	setToggleColor: Dispatch<SetStateAction<boolean>>;
};
const ChooseColor = ({ setColor, setToggleColor }: ChooseColorProps) => {
	const colors = [
		'grayBlue',
		'darkBlue',
		'darkPurple',
		'warningRed',
		'alertOrange',
		'goGreen',
		'skyBlue',
		'lila',
		'tan',
	];

	type coloresType = { name: string; intense: { light: string; core: string; dark: string } };
	const colores: coloresType[] = [
		{ name: 'grayBlue', intense: { light: '#7A8696', core: '#5B6470', dark: '#3C424A' } },
		{ name: 'darkBlue', intense: { light: '#140464', core: '#16044B', dark: '#0B0225' } },
		{ name: 'darkPurple', intense: { light: '#8E78BA', core: '#54476E', dark: '#372F48' } },
		{ name: 'warningRed', intense: { light: '#FF5C5C', core: '#FF2850', dark: '#a0152e' } },
		{ name: 'alertOrange', intense: { light: '#FF9E37', core: '#FF9037', dark: '#F67F36' } },
		{ name: 'goGreen', intense: { light: '#34FFCA', core: '#34FFBC', dark: '#2EE09A' } },
		{ name: 'skyBlue', intense: { light: '#a7ebff', core: '#95d7e3', dark: '#73a6b0' } },
		{ name: 'lila', intense: { light: '#c2b8ff', core: '#b8c0ff', dark: '#9399cc' } },
		{ name: 'tan', intense: { light: '#ffe4c5', core: '#dabda9', dark: '#a69081' } },
	];

	return (
		<div className="absolute right-full top-0 mr-4 flex flex-col items-center justify-center rounded-xl bg-[#ffffff88] p-4">
			<div className="flex flex-col gap-2">
				{colores.map((color: coloresType, i: number) => {
					const { name, intense } = color;
					const { core, dark, light } = intense;
					return (
						<div key={name} className="flex gap-2">
							<ColorButton
								setToggleColor={setToggleColor}
								color={light}
								setColor={setColor}
								key={`${name}-${light}`}
							/>
							<ColorButton
								setToggleColor={setToggleColor}
								color={core}
								setColor={setColor}
								key={`${name}-${core}`}
							/>
							<ColorButton
								setToggleColor={setToggleColor}
								color={dark}
								setColor={setColor}
								key={`${name}-${dark}`}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ChooseColor;
