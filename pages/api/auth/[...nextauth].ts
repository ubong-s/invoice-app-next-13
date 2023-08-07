import NextAuth, { AuthOptions, Awaitable } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prismadb } from '@/lib/prismadb';
import { createTransport } from 'nodemailer';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path from 'path';
import { User } from '@prisma/client';

// Email sender
const transporter = createTransport({
  //@ts-ignore
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    password: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = ({
  identifier,
  url,
}: {
  identifier: string;
  url: string;
}) => {
  const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
    encoding: 'utf8',
  });

  const emailTemplate = Handlebars.compile(emailFile);
  transporter.sendMail({
    from: `Invoicify ${process.env.EMAIL_FROM}`,
    to: identifier,
    subject: 'Your sign in link for Invoicify',
    html: emailTemplate({
      base_url: process.env.NEXTAUTH_URL,
      signin_url: url,
      email: identifier,
    }),
  });
};

const sendWelcomeEmail = async (message: { user: User }) => {
  const { email } = message.user;

  if (email) {
    try {
      const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
        encoding: 'utf8',
      });
      const emailTemplate = Handlebars.compile(emailFile);

      await transporter.sendMail({
        from: `"Invoicify" ${process.env.EMAIL_FROM}`,
        to: email,
        subject: 'Welcome to Invoicify! 🎉',
        html: emailTemplate({
          base_url: process.env.NEXTAUTH_URL,
          support_email: 'ubongsly@gmail.com',
        }),
      });
    } catch (error) {
      console.log(`❌ Unable to send welcome email to user (${email})`);
    }
  }
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
    verifyRequest: '/',
  },
  providers: [
    // EmailProvider({
    //   maxAge: 10 * 60,
    //   sendVerificationRequest,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  //@ts-ignore
  // events: { createUser: sendWelcomeEmail },
};

export default NextAuth(authOptions);
