// Database disabled for frontend-only mode
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

// Mock database exports for frontend-only mode
export const client = null;
export const db: ReturnType<typeof drizzle<typeof schema>> | null = null;
