import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

import Router from './routes/index.js'
import { Memory } from './services/memory.js';

const app = new Koa();

app.context.db = new Memory()

//Middlewares
app.use(bodyParser({ enableTypes: ['json'] }))
app.use(json())

//Routes
app.use(Router.routes())
app.use(Router.allowedMethods())

export default app