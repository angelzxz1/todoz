import Providers from './Providers';
import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import 'todoz/styles/globals.css';
import NavBar from './NavBar';
export const metadata = {
	title: 'Todoz',
	description: 'A To do list by magenz',
};

const inter = Inter({ subsets: ['latin'] });
interface Props {
	children: ReactNode;
}
export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<Providers>
				<body className={`${inter.className} bg-black text-white`}>
					<NavBar />
					<div className="pt-[2.5rem]">{children}</div>
				</body>
			</Providers>
		</html>
	);
}
