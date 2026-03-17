import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/lib/generated/prisma";
import { sendEmail } from "./email";
import { emailOTP } from "better-auth/plugins";
const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb", // or mysql, postgresql, etc
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification:false
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn:true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token},request) => {
      console.log(`Verification token:"${token}`)
      console.log(`User-agent:`, request?.headers.get("user-agent"))
      await sendEmail({
        to: user.email,
        subject: "verify your email",
        text:`click here to verify with token:${token}`,
        html: `<p>${user.name}</p> <p>click here : <a href="${url}">verify email</a></p>`,
      });
    },

    afterEmailVerification:async (user) => {
      await sendEmail({
        to: user.email,
        subject: "successfully verified",
        html: `<p>${user.name}</p>your verfied email:<p>:${ user.email}</p>`,
      });
    }

    },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [nextCookies() , 
    emailOTP({
     async sendVerificationOTP({email , otp , type}){
       if(type === "forget-password") {
          await sendEmail({to:email , subject:"Email verification",text:`Otp for password reset :${otp} `})
         
      }
     }
    })
  ],
});
