// מציג את תוצאות השאילתות: טבלת רשומות, סכום כולל,
// והתראה ברורה אם יש נתונים חסרים.

export function renderResult(result) {
    const wrapper = document.createElement('div');
    wrapper.className = 'result-wrapper';

    const header = document.createElement('div');
    header.className = 'result-header';

    const title = document.createElement('span');
    title.className = 'result-title';
    title.textContent = 'תוצאות';
    header.appendChild(title);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'icon-btn';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', () => wrapper.remove());
    header.appendChild(closeButton);

    wrapper.appendChild(header);

    const summary = document.createElement('div');
    summary.className = 'result-summary';
    summary.innerHTML = `
        <span>נמצאו ${result.count} תוצאות</span>
        <span class="total">סה"כ: ${result.total}</span>
    `;
    wrapper.appendChild(summary);

    const table = document.createElement('table');

    const headerRow = document.createElement('tr');
    const headersMap = { date: 'תאריך', amount: 'סכום', sender: 'שם', method: 'אמצעי', type: 'סוג', fileName: 'קובץ' };
    Object.values(headersMap).forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    result.data.forEach(r => {
        const tr = document.createElement('tr');
        Object.keys(headersMap).forEach(key => {
            const td = document.createElement('td');
            td.textContent = r[key] ?? '-';
            if (key === 'type') td.classList.add(r[key]);
            if (key === 'fileName') td.classList.add('file-name-col');
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });

    wrapper.appendChild(table);
    return wrapper;
}