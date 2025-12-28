import NextAuth from "next-auth";
import bcrypt from "bcryptjs"
import { User } from "@/models/user-model";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { authConfig } from "@/auth.config";
 

async function refreshAccessToken(token){
  try {
    const url = "https://oauth2.googleapis.com/token?" + new URLSearchParams({
      client_id: process.env.NEXT_GOOGLE_CLIENT_ID,
      client_secret: process.env.NEXT_SECRET_GOOGLE_ID,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken
    })

    const response =  await fetch(url, {
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
      },
      method: "POST"
    })
    
    const refreshTokens = await response.json()

    if(!response.ok){
      throw refreshTokens
    }

    return {
      ...token, 
      accessToken : refreshTokens?.access_token,
      accessTokenExpire : Date.now() + refreshTokens?.expires_in * 1000,
      refreshToken : refreshTokens?.refresh_token,
    }


  } catch (error) {

    return {
      ...token,
      error: "RefreshAccessTokenError"
    }
  }
}

export const { handlers: { GET, POST }, auth } = NextAuth({
   ...authConfig,
  providers: [
      CredentialsProvider({
        async authorize(credentials){
          
          if(!credentials?.email){
            return null
          }

        const user = await User.findOne({email: credentials?.email})
         
        if(!user) { 
          return null
        }

        const matchPassword = bcrypt.compare(credentials?.password, user?.password)
        const plainpassword = credentials?.password == user?.password
        

         if(matchPassword){
          return user
         }else if(plainpassword){
          return user
         }else{
          return null
         }
       

        }
      }),
      GoogleProvider({
         clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
         clientSecret: process.env.NEXT_SECRET_GOOGLE_ID,
         authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
         }
      })
  ],
  
  // callbacks:{
  //   async jwt({token, account, user}){

  //     if(account && user){

  //       return {
  //         accessToken : account?.access_token,
  //         accessTokenExpire : Date.now() + account?.expires_in * 1000,
  //         refreshToken : account?.refresh_token,
  //         user
  //       }
  //     }


  //     if(Date.now() < token?.accessTokenExpire){
  //       return token;
  //     }

  //     return refreshAccessToken(token)

  //   },

  //   async session({session, token}){
  //     session.user = token?.user
  //     session.accessToken = token?.access_token
  //     session.error = token?.error

  //     return session;

  //   }
  // },
  secret: process.env.NEXTAUTH_SECRET
});
