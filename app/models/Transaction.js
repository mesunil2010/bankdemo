class Transaction {
    constructor(data) {
        if (!data) {
            return
        }
        this.id = data.id
        this.source = data.source
        this.destination = data.destination
        this.amount = data.amount
    }

}

export default Transaction

