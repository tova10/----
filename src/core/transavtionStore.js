// מחזיק במקום אחד את כל ה-Transactions מכל קבצי האקסל שנטענו.
// מאפשר להוסיף נתונים מכמה קבצים ולשלוף את כולם יחד לצורך סינון.


export class TransactionStore {
    constructor() {
        this.loadFromStorage()
    }

    addTransactions(transactions) {
        this.filesName = [...new Set([...this.filesName, ...transactions.map(t => t.fileName)])]
        this.transactions = [... this.transactions, ...transactions];        
        this.saveToStorage()
    }

    getAllTransactions() {
        return this.transactions;
    }

    getAllFiles() {
        return this.filesName;
    }

    removeFile(fileName) {
        if (this.filesName.includes(fileName)) {
            this.transactions = this.transactions.filter(t => t.fileName !== fileName)
            this.filesName = this.filesName.filter(f => f !== fileName)
        }
        this.saveToStorage()
    }

    clear() {
        this.transactions = []
        this.filesName = []
        this.saveToStorage()
    }

    saveToStorage() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
        localStorage.setItem('filesName', JSON.stringify(this.filesName));
    }

    loadFromStorage() {
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.filesName = JSON.parse(localStorage.getItem('filesName')) || [];
    }
}

