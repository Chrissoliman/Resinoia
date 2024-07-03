import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb.ts";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account",  // Ensure users are prompted to select an account
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user.email === 'Mirette@gmail.com') {
        return true;
      } else {
        return false; // Return false to deny access
      }
    },
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
  },
  events: {
    async signIn(message) { console.log("User signed in:", message); },
    async signOut(message) { console.log("User signed out:", message); },
    async createUser(message) { console.log("User created:", message); },
    async updateUser(message) { console.log("User updated:", message); },
    async linkAccount(message) { console.log("Account linked:", message); },
    async session(message) { console.log("Session event:", message); }
  }
});
