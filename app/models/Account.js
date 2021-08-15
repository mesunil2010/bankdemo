
class Account {
    constructor(data) {
        if (!data) {
            return
        }
        this.id = data.id
        this.name = data.name
        this.number = data.number
        this.type = data.type
    }
}

export default Account

