// מפעיל את פונקציות הסינון לפי קריטריונים שהתקבלו, ומחשב סכום כולל.
// תומך גם בהרצת כמה שאילתות יחד ומחזיר תוצאה אחידה (Result Object) לכל אחת.

import { filterBySender, filterByDateRange, filterByMethod, filterByAmount } from "./filters.js";

export function runMultipleQueries(transactions, criteriaList) {
    return criteriaList.map(criteria => runQuery(transactions , criteria));
}

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

    if (criteria.startAmount && criteria.endAmount){
        filtered = filterByAmount(filtered, criteria.startAmount, criteria.endAmount);
    }

    let sum=0;

    filtered.forEach(tr => {
        sum += (tr.amount || 0);
    })

    return {
        data : filtered,
        total : sum,
        count : filtered.length
    }
}




