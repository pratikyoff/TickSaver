import postgres from 'postgresjs'

const migrationInit = async (sql: ReturnType<typeof postgres>) => {
    // get migration table
    const tables = await sql`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'migration'
        ORDER BY table_name;
    `
    const migrationTable = tables.find((table) => table.table_name === 'migration')
    if (!migrationTable) {
        console.log('Table migration not found. Creating migration table...')
        await sql`
            CREATE TABLE migration (
                name VARCHAR(1000) PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `
    }
}

export { migrationInit }
