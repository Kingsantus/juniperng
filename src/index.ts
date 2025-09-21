import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
// Export the db instance for use in other modules
export const db = drizzle({ client: sql });