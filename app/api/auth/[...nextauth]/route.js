import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import User from "@/models/User";
import connectDb from "@/lib/connectDB";

await connectDb();

export const authOptions = {

  providers: [

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

  ],

  callbacks: {

    // SIGN IN

    async signIn({ user, account }) {

      if (account.provider === "github") {

        await connectDb();

        const currentUser = await User.findOne({
          email: user.email,
        });

        // Create user if doesn't exist

        if (!currentUser) {

          const username =
            user.email.split("@")[0];

          const newUser = await User.create({

            email: user.email,

            username: username,

            name: user.name,

            profilePic: user.image,

          });

          user.name = newUser.username;

        }

        else {

          user.name = currentUser.username;

        }
      }

      return true;
    },

    // SESSION

    // SESSION

    async session({ session }) {

      try {

        await connectDb();

        if (!session?.user?.email) {
          return session;
        }

        const dbUser = await User.findOne({
          email: session.user.email,
        });

        if (dbUser) {

          session.user.name =
            dbUser.username || "";

          session.user.email =
            dbUser.email || "";
        }

        return session;

      }

      catch (error) {

        console.log(error);

        return session;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export {
  handler as GET,
  handler as POST
};