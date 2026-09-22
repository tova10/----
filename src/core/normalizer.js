// הופך שורות גולמיות מהאקסל (excelReader) לרשימת Transaction אחידה,
// לפי המיפוי שמוגדר ב-columnMapping.
// מסמן כאן גם שורות עם שדות חסרים, בלי לזרוק אותן.

import { columnMapping } from '../config/columnMapping.js';



export function normalizeRows(rows, fileName) {
    return rows.map(row => normalizeRow(row, fileName));
}

function normalizeRow(row, fileName) {
    let date = findValueByHeaders(row, columnMapping.date);
    date = normaliedDate(date)
    let amount = findValueByHeaders(row, columnMapping.amount);
    let sender = findValueByHeaders(row, columnMapping.sender);
    let method = findValueByHeaders(row, columnMapping.method);
    let rawType = findValueByHeaders(row, columnMapping.type);
    let type = undefined;
    if (rawType !== undefined) {
        type =
            (rawType === "CREDIT" || rawType === "DSLIP") ? "income" : "expense";
    }

    const emptyDetails = [];
    if (date === undefined) emptyDetails.push("date");
    if (amount === undefined) emptyDetails.push("amount");
    if (sender === undefined) emptyDetails.push("sender");
    if (method === undefined) emptyDetails.push("method");
    if (rawType === undefined) emptyDetails.push("type");


    return {
        date: date,
        amount: amount,
        sender: sender,
        method: method,
        type: type,
        emptyDetails: emptyDetails,
        fileName: fileName
    };
}

function findValueByHeaders(row, possibleHeaders) {
    const header = possibleHeaders.find(h => h in row)
    return row[header];
}

function normaliedDate(date) {
    if (!date) {
        return undefined
    }

    if (date instanceof Date) {
        return date
    }

    if (typeof date === 'number') {
        const excelDate = new Date(Date.UTC(1899, 11, 30+date));
        return excelDate.toLocaleDateString('en-US',{timeZone:'UTC'});
    }

    if (typeof date === 'string') {
        const separator = date.includes('.') ? '.' : '/';
        const parts = date.split(separator);
        let day = Number(parts[0]);
        let month = Number(parts[1]) - 1;
        let year = Number(parts[2]);
        if (year < 100) {
            year += 2000;
        }
        return new Date(year, month, day).toLocaleDateString('he-IL');
    }
}



