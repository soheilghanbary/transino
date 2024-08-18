import {
  type DefaultUser,
  type NextAuthOptions,
  getServerSession,
} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    // 	name: "Credentials",
    // 	credentials: {
    // 		username: { label: "Username", type: "text" },
    // 		password: { label: "Password", type: "text" },
    // 	},
    // 	async authorize(credentials, req) {
    // 		// check email exist
    // 		const user = await db.user.findUnique({
    // 			where: {
    // 				username: credentials?.username,
    // 				password: credentials?.password,
    // 			},
    // 		})
    // 		if (user) {
    // 			return user
    // 		}
    // 	},
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    // signIn: async ({ user }) => {
    //   // check user exist on database
    //   const exist = await db.user.findFirst({ where: { id: user.id } })
    //   if (exist) return true
    //   // create user
    //   await db.user.create({
    //     data: {
    //       id: user.id,
    //       name: user.name!,
    //       email: user.email!,
    //       image: user.image!,
    //       username: user.id,
    //     },
    //   })
    //   return true
    // },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.uid = user.id;
      }
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    error: '/api/auth/error',
  },
};

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user || null;
};
