// src/pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Default export for NextAuth API
export default NextAuth(authOptions);
