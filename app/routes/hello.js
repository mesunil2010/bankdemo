
import Router from 'koa-router'

const router = new Router

router.get('/api/v1/', async ctx => {
    ctx.body = {
        message: 'Hello World'
    }
})

export default router