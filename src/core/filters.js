// פונקציות סינון בודדות ועצמאיות: לפי שם, לפי אמצעי, לפי טווח תאריכים.
// כל פונקציה מקבלת רשימת תנועות ומחזירה רשימה מסוננת - בלי תלות בפונקציות האחרות.


export function filterBySender(transactions, sender) {
    return transactions.filter(t => t.sender && t.sender.toLowerCase().includes(sender.toLowerCase()));
}

export function filterByMethod(transactions, method) {
    return transactions.filter(t => t.method && t.method.toLowerCase().includes(method.toLowerCase()));
}

export function filterByDateRange(transactions, startDate, endDate) {
    return transactions.filter(t => {
        if (!t.date) return false;
        const transactionDate = new Date(t.date);
        return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
    });
}

export function filterByAmount(transactions, startAmount, endAmount) {
    return transactions.filter(t => {
        if (!t.amount) return false;
        return t.amount >= startAmount && t.amount <= endAmount;
    });
}
