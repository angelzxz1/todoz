'use client';
// import { type NextPage } from "next";
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
// import { api } from "todoz/utils/api";

const Page = (): React.JSX.Element => {
	return (
		<main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<div className="relative h-[1rem] w-[20rem] overflow-hidden rounded-2xl">
				<div className="ani absolute h-full w-full animate-xMove bg-gradient-to-r from-transparent via-[#ffffff88] to-transparent"></div>
			</div>
		</main>
	);
};

export default Page;
