'use client';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';

const LoadingButton = () => {
	return (
		<div className="relative mr-8 h-[36px] w-[36px] overflow-hidden rounded-md">
			<div className="ani absolute h-full w-full animate-xMove bg-gradient-to-r from-transparent via-[#ffffff88] to-transparent"></div>
		</div>
	);
};

const NavBar = (): React.JSX.Element => {
	const { data: sessionData, status } = useSession();

	return (
		<nav className="fixed flex w-full items-center justify-between leading-none">
			<div className="w-1/5 ">left</div>
			<div className="w-3/5 ">center</div>
			<div className="flex w-1/5 justify-end ">
				{status === 'loading' ? (
					<LoadingButton />
				) : (
					<button
						className="mr-8"
						onClick={
							sessionData
								? () => void signOut()
								: () => {
										return void signIn();
								  }
						}
					>
						{sessionData ? <IconLogout size="2.25rem" /> : <IconLogin size="2.25rem" />}
					</button>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
