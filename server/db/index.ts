import { drizzle } from 'drizzle-orm/neon-http';
import dotenv from "dotenv"


dotenv.config({
  path: '.dev.vars'
})


export default drizzle(process.env.DATABASE_URL!);
