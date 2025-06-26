import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
  ...authConfig,
})
