'use client';
import type { provider } from './page';
import React, { useRef, useState, useEffect } from 'react';
import { getProviders, signIn, type SignInResponse } from 'next-auth/react';
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
		<button className="flex rounded-lg bg-red-200 px-3 py-2" onClick={onSubmit}>
			{Icon} <p className="ml-4">Continue with {provider.name}</p>
		</button>
	);
};
