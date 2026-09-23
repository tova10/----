// מציג את תוצאות השאילתות: טבלת רשומות, סכום כולל,
// והתראה ברורה אם יש נתונים חסרים.

export function renderResult(result) {
    const wrapper = document.createElement('div');

    //יצירת כותרת כמה תוצאות יש 
    const summary = document.createElement('p');
    summary.textContent = `נמצאו ${result.count} תוצאות: `;
    wrapper.appendChild(summary);


    //יצירת טבלה עם כל הנתונים

    //יצירת כותרת
    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const headers = ['date', 'amount', 'sender', 'method', 'type', 'fileName'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    //יצירת כל שורות הטבלה מהנתונים
    result.data.forEach(r => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = r[header];
            tr.appendChild(td);
        })
        table.appendChild(tr);
    })

    wrapper.appendChild(table);


    //מדפיס מה הסכום הכולל
    const amount = document.createElement('p');
    amount.textContent = `סה"כ:  ${result.total}  `;
    wrapper.appendChild(amount);
    amount.className = 'result-total';



    return wrapper;
}