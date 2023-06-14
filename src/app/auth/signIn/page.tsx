'use client';
import { getProviders, signIn, useSession } from 'next-auth/react';
// import { type SignInResponse } from 'next-auth/react';
// import { getServerSession } from 'next-auth/next';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
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
	const { id, name } = provider;
	return (
		<button
			className="my-4 flex w-full rounded-lg border border-white p-2 hover:bg-white hover:text-black"
			onClick={() => void signIn(id, { callbackUrl: '/', redirect: true })}
		>
			{Icon} <p className="ml-4 w-full">Continue with {name}</p>
		</button>
	);
};

type InputProps = {
	type: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	children: React.ReactNode;
};
const Input = ({ type, value, setValue, children }: InputProps): React.JSX.Element => {
	return (
		<>
			<label className="ml-2">{children}</label>
			<input
				type={type}
				value={value}
				onChange={e => {
					setValue(e.target.value);
				}}
				className="mb-4 w-full border-b border-white bg-transparent p-2 focus-visible:outline-none"
			/>
		</>
	);
};

const LoginPage = () => {
	const [data, setData] = useState<provider[] | undefined>(undefined);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
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
					<div className="flex h-1/5 w-full flex-wrap text-lg">
						<h1 className="flex h-fit w-full items-center justify-center  text-4xl font-bold">Sign in</h1>
						<p className="flex h-fit w-full items-center justify-center ">Sign in to continue to Todoz</p>
					</div>

					<div className="flex h-4/5 w-full flex-col  justify-evenly">
						<form method="post" action="/api/auth/callback/credentials">
							<Input type="text" value={username} setValue={setUsername}>
								Username
							</Input>
							<Input type="password" value={password} setValue={setPassword}>
								Password
							</Input>
							<button
								className="my-4 flex w-full items-center justify-center rounded-lg border border-white p-2 hover:bg-white hover:text-black"
								onClick={() =>
									void signIn('credentials', {
										callbackUrl: '/',
										redirect: true,
										username: username,
										password: password,
									})
										.then(res => {
											console.log(res);
										})
										.catch(err => {
											console.log(err);
										})
								}
							>
								Sign in
							</button>
						</form>
						<div className="flex w-full items-center justify-center ">
							<div className="mr-4 h-px w-2/5 bg-white" />
							<div>{}Or</div>
							<div className="ml-4 h-px w-2/5 bg-white" />
						</div>
						<div className="w-full">
							{data ? (
								data
									.filter((provider: provider) => provider.id !== 'credentials')
									.map((provider: provider, i) => {
										return (
											<Button
												provider={provider}
												key={`${i}-${provider.id}`}
												Icon={
													provider.id === 'github' ? <IconBrandGithub /> : <IconBrandGoogle />
												}
											/>
										);
									})
							) : (
								<div>Loading...</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
