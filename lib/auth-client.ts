import {
  createAuthClient
} from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins"
import dotenv from "dotenv"

import { ac, admin, user } from '@/utils/auth';
import { auth } from "./auth";


dotenv.config({
  path: ".dev.vars"
})

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        user
      }
    }),
    inferAdditionalFields<typeof auth>()
  ]
})

export const {
  signIn,
  signOut,
  signUp,
  useSession
} = authClient;