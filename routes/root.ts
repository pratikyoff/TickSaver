import { Router } from '@oak/oak/router'
import { healthcheckRouter } from './healthcheck.ts'

const rootRouter = new Router()

rootRouter.use('/', healthcheckRouter.routes())
rootRouter.use('/healthcheck', healthcheckRouter.routes())

export { rootRouter }