import {
  betterAuth,
} from 'better-auth';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import dotenv from "dotenv";
import { ac, admin, user } from '@/utils/auth';

// PLUGINS
import { admin as adminPlugin, openAPI } from "better-auth/plugins";
import db from '@/server/db';
import { APP_CONFIG, ROLES } from '@/constants';

dotenv.config({
  path: ".dev.vars"
})

export const auth = betterAuth({
  basePath: "/v1/auth",

  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    // schema: {
    //   users: users,
    //   sessions: sessions,
    //   accounts: accounts,
    //   verifications: verifications,
    // },
  }),

  // EMAIL & PASSWORD
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      console.log("Sending e-mail...")
      // Send an email to the user with a link to reset their password
    },
  },

  // SOCIAL PROVIDERS
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },


  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Perform actions after user creation
        }
      }
    }
  },

  // ADVANCED CONFIG
  advanced: {
    cookiePrefix: APP_CONFIG.PREFIX,
  },
  session: {
    // AVOID CALLING /get-session every request
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  plugins: [
    adminPlugin({
      adminRoles: [ROLES.Admin],
      ac,
      roles: {
        admin,
        user
      }
    }),
    openAPI()

    // stripe({
    //   createStripe(),
    //   stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    //   createCustomerOnSignUp: true,
    // })
  ]
});
