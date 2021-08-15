import Account from "../models/Account.js";

class Memory {
    constructor() {
        this.accounts = seedAccount()
        this.transactions = []
    }

    set(key, value) {
        if (this[key]) {
            this[key].push(value)
        } else {
            throw Error('Invalid table')
        }
    }

    get(key, constraints = null) {
        if (constraints) {
            const data = this[key]
            if (!data.find(item => constraints[Object.keys(constraints)[0]] == item[Object.keys(constraints)[0]])) {
                throw Error('NOT_FOUND')
            }
        }
        if (this[key])
            return this[key]
        else
            throw Error('Invalid table')
    }
}

const seedAccount = () => {
    return [
        new Account({
            id: 1628955794554,
            name: 'Sunil Chaulagain',
            number: 111111,
            type: 'personal',
            transactions: []
        }),
        new Account({
            id: 1628955794552,
            name: 'Prashant Chaulagain',
            number: 111112,
            type: 'personal',
            transactions: []
        })
    ]
}

export {
    Memory,
    seedAccount
}
