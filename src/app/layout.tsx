
import Providers from "./Providers";
import { type ReactNode } from "react";
import 'todoz/styles/globals.css'
export const metadata = {
  title: 'Todoz',
  description: 'A To do list by magenz',
}


interface Props {
  children: ReactNode;
}
export default function RootLayout({children}:Props) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}
