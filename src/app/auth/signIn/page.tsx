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
	console.log(provider);
	const [result, setResult] = useState<SignInResponse | undefined>();
	const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		signIn(id, {
			redirect: true,
			callbackUrl: '/',
		})
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
		<button className="flex max-h-8 w-full rounded-lg bg-red-200 px-3 py-2" onClick={onSubmit}>
			{Icon} <p className="ml-4">Continue with {provider.name}</p>
		</button>
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
		<div className={'flex h-screen w-full flex-col items-center justify-center gap-1 bg-purple-200'}>
			<div className="flex h-3/4 w-1/4 flex-wrap justify-center bg-teal-900">
				<h1 className="w-full text-4xl font-bold">Sign in</h1>
				<p className="w-full text-lg">Sign in to continue to Todoz</p>
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
	);
};

export default LoginPage;
