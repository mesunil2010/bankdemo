
import Router from 'koa-router'
import AccountController from '../controllers/account.js'

const router = new Router

const controller = new AccountController()

router.post('/api/v1/transfers', async ctx => {
    await controller.transfer(ctx)
})

router.get('/api/v1/accounts', async ctx => {
    await controller.index(ctx)
})

export default router