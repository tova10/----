// פונקציות סינון בודדות ועצמאיות: לפי שם, לפי אמצעי, לפי טווח תאריכים.
// כל פונקציה מקבלת רשימת תנועות ומחזירה רשימה מסוננת - בלי תלות בפונקציות האחרות.


export function filterBySender(transactions, senders) {
    return transactions.filter(t => t.sender && senders.some(sender=> t.sender.toLowerCase().includes(sender.toLowerCase())));
}

export function filterByMethod(transactions, methods) {
    return transactions.filter(t => t.method && methods.some(method=> t.method.toLowerCase().includes(method.toLowerCase())));
}

export function filterByAmount(transactions, startAmount, endAmount) {
    return transactions.filter(t => {
        if (!t.amount) return false;
        const transactionAmount = t.amount;
        return transactionAmount >= startAmount && transactionAmount <= endAmount;
    });
}

export function filterByDateRange(transactions, startDate, endDate) {
    return transactions.filter(t => {
        if (!t.date) return false;
        const transactionDate = new Date(t.date);
        return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    });
}


export function filterByMissingFields(transactions, fields) {
    return transactions.filter(t =>
        fields.every(field => t.emptyDetails.includes(field))
    );
}

