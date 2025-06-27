import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any
      session.user.token = token.token as string

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.token = user.token
      }

      return token
    },
  },
  ...authConfig,
})
