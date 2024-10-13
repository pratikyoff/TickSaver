import 'dotenv'
import { Application } from 'jsr:@oak/oak/application'
// import { ApiClient } from 'upstox-js-sdk'
import { ENVIRONMENT } from './constants/app.ts'
import { rootRouter } from './routes/root.ts'

const allowedEnvs = Object.values(ENVIRONMENT)
const env = Deno.env.get('ENV') as typeof allowedEnvs[number]

if (!allowedEnvs.includes(env)) {
    throw new Error(
        `Invalid ENV environment variable with value: ${env}. Must be one of ${
            allowedEnvs.join(', ')
        }`,
    )
}

const app = new Application()
app.use(rootRouter.routes())
app.use(rootRouter.allowedMethods())

const port = 20000
await app.listen({ port })
console.log(`Server listening on port ${port}`)
