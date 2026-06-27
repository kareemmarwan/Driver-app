import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const { handlers } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "رقم الهاتف", type: "tel" },
        password: { label: "كلمة المرور", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.phone === "123" && credentials?.password === "123") {
          return { id: "1", name: "مستخدم تجريبي", phone: "0599999999" };
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).id = token.id;
      return session;
    },
  },
});

export const { GET, POST } = handlers;
