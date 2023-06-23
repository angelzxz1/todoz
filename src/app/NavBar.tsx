'use client';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

const LoadingButton = () => {
	return (
		<div className="relative mr-8 h-[36px] w-[36px] overflow-hidden rounded-md">
			<div className="ani absolute h-full w-full animate-xMove bg-gradient-to-r from-transparent via-[#ffffff88] to-transparent" />
		</div>
	);
};
type profileLinkProps = {
	name: string | null | undefined;
	id: string;
};
const profileLink = ({ name, id }: profileLinkProps) => {
	return <Link href={`/user/${id}`}> {name ? name : 'Extranger'} </Link>;
};

const NavBar = (): React.JSX.Element => {
	const { data: sessionData, status } = useSession();

	return (
		<nav className="fixed flex w-full items-center justify-between bg-[#250e4785] leading-none backdrop-blur-[8px]">
			<div className="w-1/5 ">
				<h1 className="ml-8 text-xl">
					{status === 'loading' ? (
						<></>
					) : !sessionData ? (
						''
					) : (
						profileLink({ name: sessionData.user.name, id: sessionData.user.id })
					)}
				</h1>
			</div>
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
						{sessionData ? (
							<div className="flex items-center">
								<div className="mr-2">Sign out</div>
								<IconLogout size="2.25rem" />{' '}
							</div>
						) : (
							<div className="flex items-center">
								<div className="mr-2">Sign in</div>
								<IconLogin size="2.25rem" />
							</div>
						)}
					</button>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
