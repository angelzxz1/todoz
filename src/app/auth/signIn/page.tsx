'use client';
import { getProviders, signIn } from 'next-auth/react';
// import { type SignInResponse } from 'next-auth/react';
// import { getServerSession } from 'next-auth/next';
import { IconBrandDiscordFilled, IconBrandGithub } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
// import type { GetServerSidePropsContext } from 'next/types';
// import { authOptions } from 'todoz/server/auth';
// import { fetchData } from 'next-auth/client/_utils';

const listProviders = async () => {
	return {
		providers: await getProviders(),
	};
};
export interface provider {
	id: string;
	name: string;
	type: string;
	signinUrl: string;
	callbackUrl: string;
}
type ButtonProps = {
	provider: provider;
	Icon: React.JSX.Element;
};
const Button = ({ provider, Icon }: ButtonProps) => {
	const { id } = provider;
	// const [result, setResult] = useState<SignInResponse | undefined>();
	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		return await signIn(id);
	};
	return (
		<button
			className="my-4 flex w-full rounded-lg border border-white p-2 hover:bg-white hover:text-black"
			// eslint-disable-next-line @typescript-eslint/no-misused-promises
			onClick={onSubmit}
		>
			{Icon} <p className="ml-4 w-full">Continue with {provider.name}</p>
		</button>
	);
};

type InputProps = {
	type: string;
	children: React.ReactNode;
};
const Input = ({ type, children }: InputProps): React.JSX.Element => {
	return (
		<>
			<label className="ml-2">{children}</label>
			<input
				type={type}
				className="mb-4 w-full border-b border-white bg-transparent p-2 focus-visible:outline-none"
			/>
		</>
	);
};

const LoginPage = () => {
	const [data, setData] = useState<provider[]>([]);
	useEffect(() => {
		listProviders()
			.then(data => {
				setData(Object.values(data.providers ? data.providers : {}));
			})
			.catch(e => {
				console.log(e);
			});
	}, []);

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center ">
			<div className="flex h-3/4 w-2/5 flex-wrap justify-center overflow-hidden rounded-xl">
				<div className=" flex h-full w-1/2 flex-wrap bg-[url('/waves_bg.webp')]">
					<div className="m-4 w-full bg-[#372F4883] backdrop-blur-[4px]">
						<h1 className="flex w-full items-center justify-center text-4xl font-bold"></h1>
					</div>
				</div>
				<div className="flex h-full w-1/2 flex-wrap rounded-r-xl bg-gradient-to-br from-darkPurple-dark to-darkBlue-dark p-8 ">
					<h1 className="flex w-full items-center justify-center text-4xl font-bold">Sign in</h1>
					<p className="flex w-full items-center justify-center text-lg">Sign in to continue to Todoz</p>
					<div className="h-1/2 w-full">
						<form action="">
							<Input type="email">Email</Input>
							<Input type="password">Password</Input>
						</form>
						<div className="flex w-full items-center justify-center ">- Or -</div>
						{data.map((provider: provider, i) => {
							return (
								<Button
									provider={provider}
									key={`${i}-${provider.id}`}
									Icon={provider.id === 'discord' ? <IconBrandDiscordFilled /> : <IconBrandGithub />}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
