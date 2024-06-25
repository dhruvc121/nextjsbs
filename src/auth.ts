import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { ZodError } from "zod"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [ Credentials({
    credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      try {
        if (!credentials) {
            throw new Error("No credentials provided");
          }
          // Parse and validate the credentials
          const { email, password } = await signInSchema.parseAsync(credentials);
          
          // Perform your user lookup logic here, e.g., querying the database
          const user = { email: "user@mail.com", usertype: "admin", userid: 1 }; // Example user

          if (!user) {
            throw new Error("User not found.");
          }

          return user;
      } catch (error) {
        if (error instanceof ZodError) {
            // Handle validation error
            return null;
          }

          // Optionally handle other errors
          return null;
      }
    },
  })],
})