'use client';
import { getProviders, signIn, type SignInResponse } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { IconBrandDiscordFilled, IconBrandGithub } from '@tabler/icons-react';
import React, { useRef, useState, useEffect } from 'react';
import type { GetServerSidePropsContext } from 'next/types';
import { authOptions } from 'todoz/server/auth';
import { fetchData } from 'next-auth/client/_utils';

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
	const { id, name, type, signinUrl, callbackUrl } = provider;
	const [result, setResult] = useState<SignInResponse | undefined>();
	const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		signIn(id)
			.then(data => {
				setResult(data);
			})
			.catch(err => {
				console.log(err);
			});
		// console.log(result);
		e.preventDefault();
	};
	return (
		<button
			className="my-4 flex w-full rounded-lg border border-white p-2 hover:bg-white hover:text-black"
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
		<div className={'flex h-screen w-full flex-col items-center justify-center '}>
			<div className="flex h-3/4 w-1/3 flex-wrap justify-center overflow-hidden rounded-xl">
				<div className=" flex h-full w-1/2 flex-wrap bg-[url('/waves_bg.webp')]">
					<div className="m-4 w-full backdrop-blur-[4px]"></div>
				</div>
				<div className="flex h-full w-1/2 flex-wrap p-8">
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
