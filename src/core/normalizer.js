// הופך שורות גולמיות מהאקסל (excelReader) לרשימת Transaction אחידה,
// לפי המיפוי שמוגדר ב-columnMapping.
// מסמן כאן גם שורות עם שדות חסרים, בלי לזרוק אותן.

import { columnMapping } from '../config/columnMapping.js';


export function normalizeRows(rows, fileName) {
    return rows.map(row => normalizeRow(row, fileName));
}

function normalizeRow(row, fileName) {
    const date = findValueByHeaders(row, columnMapping.date);
    const amount = findValueByHeaders(row, columnMapping.amount);
    const sender = findValueByHeaders(row, columnMapping.sender);
    const method = findValueByHeaders(row, columnMapping.method);
    const rawType = findValueByHeaders(row, columnMapping.type);
    let type=undefined;
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



