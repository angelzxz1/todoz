'use client';
import { getProviders, signIn } from 'next-auth/react';
import React, { useRef, useState, useEffect } from 'react';

const listProviders = async () => {
	return {
		providers: await getProviders(),
	};
};
interface provider {
	id: string;
	name: string;
	type: string;
	signinUrl: string;
	callbackUrl: string;
}
const Button = ({ provider }: { provider: provider }) => {
	const { id, name, type, signinUrl, callbackUrl } = provider;
	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		console.log('is clicking');
		const result = await signIn(id, {
			callbackUrl: callbackUrl,
			redirect: false,
		});
		console.log(result);
		e.preventDefault();
	};
	return (
		<button onClick={void onSubmit} className="rounded-lg bg-red-200 px-3 py-2">
			{provider.name}
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
		<div
			className={
				'flex h-screen flex-col items-center  justify-center gap-1 bg-gradient-to-br from-cyan-300 to-sky-600'
			}
		>
			{data.map((provider: provider, i) => {
				return <Button provider={provider} key={`${i}-${provider.id}`}></Button>;
			})}
		</div>
	);
};

export default LoginPage;
