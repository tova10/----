// מציג את תוצאות השאילתות: טבלת רשומות, סכום כולל,
// והתראה ברורה אם יש נתונים חסרים.


export function createResultsView(results) {
    const container = document.createElement('div');

    results.forEach((result, index) => {
        const resultBlock = document.createElement('div');

        //כותרת
        const title = document.createElement('h3');
        title.textContent = `שאילתה ${index + 1}`;
        //סכום כולל
        const summary = document.createElement('p');
        summary.textContent = `סה"כ: ${result.total} | מספר רשומות: ${result.count}`;
        //טבלה
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        ['תאריך', 'שם', 'אמצעי', 'סכום'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        //נתונים בטבלה
        result.data.forEach(transaction => {
            const row = document.createElement('tr');

            const dateCell = document.createElement('td');
            dateCell.textContent = transaction.date;

            const senderCell = document.createElement('td');
            senderCell.textContent = transaction.sender;

            const methodCell = document.createElement('td');
            methodCell.textContent = transaction.method;

            const amountCell = document.createElement('td');
            amountCell.textContent = transaction.amount;

            row.appendChild(dateCell);
            row.appendChild(senderCell);
            row.appendChild(methodCell);
            row.appendChild(amountCell);

            table.appendChild(row);
        });

        table.appendChild(headerRow);
        resultBlock.appendChild(title);
        resultBlock.appendChild(summary);
        resultBlock.appendChild(table);
        container.appendChild(resultBlock);
    });

    return container;
}