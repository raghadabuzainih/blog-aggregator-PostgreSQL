import {defineConfig} from 'drizzle-kit'
import {readConfig} from './config.ts'

export default defineConfig({
    schema: "src/lib/db/schema.ts",
    out: "src/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: readConfig().dbUrl
    }
})