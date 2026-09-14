// מחזיק במקום אחד את כל ה-Transactions מכל קבצי האקסל שנטענו.
// מאפשר להוסיף נתונים מכמה קבצים ולשלוף את כולם יחד לצורך סינון.


export class TransactionStore {
    constructor() {
        this.transactions = []
    }

    addTransactions(transactions) {
        this.transactions = [... this.transactions, ...transactions];
    }

    getAllTransactions() {
        return this.transactions;
    }

    clear() {
        this.transactions = []
    }
}

