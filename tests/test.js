if (process.env.NODE_ENV !== 'testing') {
    throw new Error('NODE_ENV not set')
}

//This starts the app up
import app from '../app/index.js'
import request from 'supertest'

let server
beforeAll(() => { server = app.listen(8888) })
afterAll(() => { server.close() })

describe('Hello API', () => {
    it('gets the hello endpoint', async () => {
        const response = await request(server).get('/api/v1/')

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Hello World')
    })
})