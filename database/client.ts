import postgres from 'postgresjs'
import { ENVIRONMENT } from '../constants/app.ts'
import { migrationInit } from './migration-init.ts'

const envSpecificDbOptions = {
    [ENVIRONMENT.DEVELOPMENT]: {
        ssl: false,
    },
    [ENVIRONMENT.PRODUCTION]: {
        ssl: true,
    },
}

const env = Deno.env.get('ENV') as typeof ENVIRONMENT[keyof typeof ENVIRONMENT]

let sql: ReturnType<typeof postgres>
const getSingletonClient = async () => {
    if (!sql) {
        const options = {
            database: Deno.env.get('DB_NAME'),
            host: Deno.env.get('DB_HOST'),
            username: Deno.env.get('DB_USER'),
            password: Deno.env.get('DB_PASSWORD'),
            ...envSpecificDbOptions[env],
        }
        sql = postgres(options)
        await migrationInit(sql)
    }
    return sql
}

export { getSingletonClient }
