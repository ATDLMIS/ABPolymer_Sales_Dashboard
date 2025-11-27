import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Axios from '@/utils/axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},

      async authorize(credentials) {
        const { Username, Password, FYID } = credentials; // ✅ FIXED

        try {
          const res = await Axios.post(
            '?action=login',
            { Username, Password }
          );

          if (!res.data.success) {
            return null;
          }

          const user = {
            id: res.data.user.UserID,
            EmployeeID: res.data.user.EmployeeID,
            Username: res.data.user.Username,
            email: res.data.user.Email,
            Phone: res.data.user.Phone,
            avatar: res.data.user.Userpicture,

            FinancialYearID: FYID, // ✅ STORE FYID FROM LOGIN FORM
          };

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.financialYearId = user.FinancialYearID; // ✅ SAVE IN JWT
      }
      return token;
    },

    async session({ session, token }) {
      try {
        const res = await Axios.get(
          `?action=get_sndUser&UserID=${token.sub}`
        );

        let userData = res.data;

        session.user.id = userData.UserID;
        session.user.employeeId = userData.EmployeeID;
        session.user.email = userData.Email;
        session.user.name = userData.EmpName;
        session.user.avatar = userData.Userpicture;

        session.user.financialYearId = token.financialYearId; // ✅ EXPOSE FYID IN SESSION

        return session;
      } catch (error) {
        console.log(error);
      }
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
