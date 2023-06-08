import NextAuth from "next-auth";
import { authOptions } from "todoz/server/auth";

export default NextAuth(authOptions);
