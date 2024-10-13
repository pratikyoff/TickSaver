import { Router } from '@oak/oak/router'

const healthcheckRouter = new Router()

healthcheckRouter.get('/', (ctx) => {
    ctx.response.body = 'OK'
})

export { healthcheckRouter }