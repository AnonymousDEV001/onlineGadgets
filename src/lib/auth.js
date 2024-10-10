import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models";
import { connectToDb } from "./utils";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";


const Login = async (credentials) => {
  try {
    connectToDb();
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    
    const isCorrectPassword = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if(!isCorrectPassword){
      throw new Error("Invalid Credentials");
    }
    return user
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await Login(credentials)
          return user
        } catch (error) {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        connectToDb();
        try {
          const existingUser = await User.findOne({
            email: profile.email,
          });
          if (!existingUser) {
            const newUser = new User({
              name: profile.name,
              first_name: profile.given_name,
              last_name: profile.family_name,
              email: profile.email,
              image: profile.picture,
              provider:account.provider
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },


    //NOT SURE WHAT THIS DOES
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //     token.isAdmin = user.isAdmin;
    //   }
    //   console.log(token)
    //   return token;
    // },
    // async session({ session, token }) {
    //   if (token) {
    //     session.user.id = token.id;
    //     session.user.isAdmin = token.isAdmin ?? false;
    //   }
    //   return session;
    // },
    ...authConfig.callbacks,
  },
});
