// מפעיל את פונקציות הסינון לפי קריטריונים שהתקבלו, ומחשב סכום כולל.
// תומך גם בהרצת כמה שאילתות יחד ומחזיר תוצאה אחידה (Result Object) לכל אחת.

import { filterBySender, filterByDateRange, filterByMethod } from "./filters.js";


export function runQuery(transactions, criteria) {
    let filtered = transactions;

    if (criteria.sender) {
        filtered = filterBySender(filtered, criteria.sender);
    }

    if (criteria.method) {
        filtered = filterByMethod(filtered, criteria.method);
    }

    if (criteria.startDate && criteria.endDate) {
        filtered = filterByDateRange(filtered, criteria.startDate, criteria.endDate);
    }

    const total = filtered.reduce((sum, transaction) => {
        return sum + (transaction.amount || 0);
    }, 0);

    return {
        data : filtered,
        total : total,
        count : filtered.length
    }
}


export function runMultipleQueries(transactions, criteriaList) {
    return criteriaList.map(criteria => runQuery(transactions , criteria));
}

