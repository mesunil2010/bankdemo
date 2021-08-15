import Transaction from '../models/Transaction.js'

class AccountController {
    async index(ctx) {
        const storage = ctx.db
        try {
            const accounts = await storage.get('accounts')
            const transactions = await storage.get('transactions')

            accounts.forEach(account => {
                const transactionsForAcc = []
                transactions.forEach(transaction => {
                    const currentTransaction = { ...transaction }
                    if (currentTransaction.source == account.number) {
                        currentTransaction.type = 'debited'
                        transactionsForAcc.push(currentTransaction)
                    }
                    if (currentTransaction.destination == account.number) {
                        currentTransaction.type = 'credited'
                        transactionsForAcc.push(currentTransaction)
                    }
                })
                account.transactions = transactionsForAcc
            });

            ctx.body = accounts
        } catch (error) {
            ctx.throw(400, error)
        }
    }

    async transfer(ctx) {
        const fields = ctx.request.body
        const storage = ctx.db

        //Basic Schema Validation
        try {
            this._validateFields(fields, [ 'source', 'destination', 'amount' ])
        } catch (err) {
            ctx.throw(400, err)
        }

        const transaction = new Transaction({
            id: Date.now(),
            source: fields.source,
            destination: fields.destination,
            amount: fields.amount,
        })

        try {
            //Check if accounst exists
            await storage.get('accounts', {
                number: transaction.source
            })
            await storage.get('accounts', {
                number: transaction.destination
            })

            await storage.set('transactions', transaction)

            ctx.body = { message: 'SUCCESS' }
        } catch (err) {
            ctx.throw(400, err)
        }

    }

    //We can use JSONSchema validator or JOI library for this in real case
    _validateFields(fields, validFields) {
        // Validate input schema
        const isSchemaValid = Object.getOwnPropertyNames(fields).every( field => {
            return validFields.includes(field)
        })
        if (!isSchemaValid ) 
            throw Error('INVALID_SCHEMA')
        
        //Check if all input are numbers
        const isAllNumber = Object.values(fields).every( field => {
            return !isNaN(field)
        })
        if (!isAllNumber ) 
            throw Error('INVALID_DATA')
        
        return true
    }
}

export default AccountController
