import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import User from "@/models/User";
import connectDb from "@/lib/connectDB";

export const authOptions = {

  providers: [

    GitHubProvider({

      clientId: process.env.GITHUB_ID,

      clientSecret:
        process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {

    async signIn({ user, account }) {

      if (account.provider === "github") {

        await connectDb();

        const currentUser =
          await User.findOne({

            email: user.email,
          });

        if (!currentUser) {

          const username =
            user.email.split("@")[0];

          const newUser =
            await User.create({

              email: user.email,

              username: username,

              name: user.name,

              profilePic: user.image,
            });

          user.name =
            newUser.username;
        }

        else {

          user.name =
            currentUser.username;
        }
      }

      return true;
    },

    async session({ session }) {

      await connectDb();

      const dbUser =
        await User.findOne({

          email:
            session.user.email,
        });

      if (dbUser) {

        session.user.name =
          dbUser.username;

        session.user.email =
          dbUser.email;
      }

      return session;
    },
  },
};

const handler =
  NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};