import Providers from './Providers';
import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import 'todoz/styles/globals.css';
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
				<body className={`${inter.className} bg-black text-white`}>{children}</body>
			</Providers>
		</html>
	);
}
