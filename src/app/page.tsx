'use client';
// import { type NextPage } from "next";
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { IconNotification } from '@tabler/icons-react';
// import { api } from "todoz/utils/api";

const Turnable = () => {
	return (
		<div className="rotation-father relative mx-1 flex items-center justify-center">
			<div className="daily absolute flex w-full items-center justify-center">daily</div>
			<div className="weekly absolute flex w-full items-center justify-center">weekly</div>
			<div className="monthly absolute flex w-full items-center justify-center">monthly</div>
		</div>
	);
};

const Page = (): React.JSX.Element => {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-4 text-black">
			<div className="grid h-nav-screen w-full grid-cols-3 grid-rows-3 gap-4 px-4 md:h-[32rem] ">
				<div
					className="col-start-1 col-end-4 row-start-1 row-end-3 flex flex-col items-center justify-center
					rounded-2xl bg-purple-400
					md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-4
				"
				>
					<h1 className="flex w-full flex-wrap justify-center text-[5rem]">
						<div className="px-1">Meet</div>
						<div className="px-1">To-Doz</div>
					</h1>
					<h2 className="flex w-full flex-wrap justify-center text-[2rem]">
						<div className="mr-2">Your</div>
						<div className="mr-2">new</div>
						<div className="mr-2">tool</div>
						<div className="mr-2">for</div>
						<div className="mr-2">management</div>
						<div className="">of</div> <Turnable />
						<div>tasks.</div>
					</h2>
				</div>
				<div
					className="col-start-1 col-end-4 row-start-3 row-end-4
					flex items-center rounded-2xl bg-blue-300
					md:col-start-3 md:col-end-4 md:row-start-1 md:row-end-4
				"
				>
					<p className="p-4 text-justify text-[2rem] ">
						Todoz is more than your regular &lsquo;To Do&lsquo; application. It&lsquo;s your ultimate
						personal productivity companion.
					</p>
				</div>
			</div>
			<div className="flex h-[24rem] w-full gap-4 px-4 lg:h-[12rem]">
				<div className="h-full w-1/4 rounded-2xl bg-orange-300"></div>
				<div className="flex h-full w-2/3 items-center overflow-hidden rounded-2xl bg-teal-300">
					<div className=" p-4 text-justify text-[1.25rem]">
						Created by{' '}
						<a
							href="https://www.magenz.dev"
							className="border-b border-black font-extrabold hover:border-darkPurple-dark hover:text-darkPurple-dark"
						>
							Magenz
						</a>{' '}
						as an alternative to improve and manage his day to day, With Todoz, you&lsquo;ll never miss an
						important deadline again. Receive alerts and reminders directly to your email or phone, ensuring
						that you stay on top of your tasks wherever you are. Whether it&lsquo;s a critical work
						assignment, a personal goal, or a simple grocery list, Todoz keeps you informed and accountable.
					</div>
				</div>
				<div className="h-full w-1/12 rounded-2xl bg-red-400"></div>
			</div>
			<div className="flex h-[16rem] w-full gap-4 px-4 md:h-[12rem]">
				<div className="flex h-full w-1/5 items-center rounded-2xl bg-slate-400">
					<div className="p-4 text-justify text-[1.25rem]">
						<div className="flex w-full justify-center">
							<IconNotification stroke="1" />
						</div>
						Receive alerts and reminders directly to your email or phone
					</div>
				</div>
				<div className="flex h-full w-[30%] items-center rounded-2xl bg-yellow-300">
					<p className=" p-4 text-justify text-[1.25rem]">
						Get suggestions for the most optimal schedules and prioritization strategies
					</p>
				</div>
				<div className="flex h-full w-1/2 items-center justify-center rounded-2xl bg-lime-400">
					<p className=" p-4 text-justify text-[1.25rem]">
						It offers personalized suggestions for rest and relaxation
					</p>
				</div>
			</div>
		</main>
	);
};

export default Page;
