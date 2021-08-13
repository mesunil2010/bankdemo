import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

import helloRouter from './routes/hello.js'

const app = new Koa();

//Middlewares
app.use(bodyParser({ enableTypes: ['json'] }))
app.use(json())

//Routes
app.use(helloRouter.routes())
app.use(helloRouter.allowedMethods())

export default app