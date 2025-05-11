
import { Session, User } from "better-auth";

export type Bindings = {
  BUCKET: R2Bucket;
  AI: Ai;

  DATABASE_URL: string;
};


// VARIABLES
export type Variables = {
  user: User | null;
  session: Session | null;
};