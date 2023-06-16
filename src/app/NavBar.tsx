'use client';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const NavBar = (): React.JSX.Element => {
	const { data: sessionData, status } = useSession();
	return (
		<nav className="fixed flex w-full items-center justify-between leading-none">
			<div className="w-1/5 ">left</div>
			<div className="w-3/5 ">center</div>
			<div className="flex w-1/5 justify-end ">
				{status === 'loading' ? (
					<></>
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
