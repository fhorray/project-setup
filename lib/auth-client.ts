import {
  createAuthClient
} from "better-auth/react";
import { adminClient } from "better-auth/client/plugins"

import { ac, admin, user } from '@/utils/auth';



export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  basePath: "/v1/auth",
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        user
      }
    })
  ]
})

export const {
  signIn,
  signOut,
  signUp,
  useSession
} = authClient;