if (process.env.NODE_ENV !== 'testing') {
    throw new Error('NODE_ENV not set')
}

//This starts the app up
import app from '../app/index.js'
import request from 'supertest'
import { seedAccount } from '../app/services/memory.js'

let server
beforeAll(() => { server = app.listen(8888) })
afterAll(() => { server.close() })

describe('Transfer API - POST /transfers', () => {
    it('fails to transfers when schema is wrong', async () => {
        const response = await request(server)
            .post('/api/v1/transfers')
            .send({
                "source": 111112,
                "destination": 111111,
                "amount": 500,
                "inject" : "x"
            })
            .set('Accept', 'application/json')

        expect(response.status).toBe(400)
        expect(response.text).toBe('INVALID_SCHEMA')
    })

    it('fails to transfers when data is wrong', async () => {
        const response = await request(server)
            .post('/api/v1/transfers')
            .send({
                "source": 111112,
                "destination": 111111,
                "amount": "500x",
            })
            .set('Accept', 'application/json')

        expect(response.status).toBe(400)
        expect(response.text).toBe('INVALID_DATA')
    })

    it('fails to transfers when account does not exist', async () => {
        const response = await request(server)
            .post('/api/v1/transfers')
            .send({
                "source": 111113,
                "destination": 111111,
                "amount": 500,
            })
            .set('Accept', 'application/json')

        expect(response.status).toBe(400)
        expect(response.text).toBe('NOT_FOUND')
    })

    it('successfully transfers between accounts', async () => {
        const response = await request(server)
            .post('/api/v1/transfers')
            .send({
                "source": 111112,
                "destination": 111111,
                "amount": 500
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('SUCCESS')
    })
})

describe('Accounts API - GET /accounts ', () => {
    it('successfully finds accounts', async () => {
        const response = await request(server)
            .get('/api/v1/accounts')

        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(seedAccount())
        expect(response.body[0].transactions[0]).toMatchObject({
            "source": 111112,
            "destination": 111111,
            "amount": 500,
            "type" : "credited"
        })
        expect(response.body[1].transactions[0]).toMatchObject({
            "source": 111112,
            "destination": 111111,
            "amount": 500,
            "type" : "debited"
        })
        
    })
})