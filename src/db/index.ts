import postgres from 'postgres'
import * as schema from './schema'
import { env } from '../env'
import { drizzle } from 'drizzle-orm/postgres-js'

export const client = postgres(env.DB_URL)
export const db = drizzle(client, { schema, logger: true })
