// מציג טופס להזנת קריטריוני חיפוש (שם, אמצעי, טווח תאריכים),
// ומאפשר הוספת כמה טפסי שאילתה במקביל.

export function createQueryFormView(onSubmitQueries) {

    //אזור ראשי - כל השאילתות וכל התוצאות
    const container = document.createElement('div');
    container.className = 'section-block';

    //כותרת
    const title = document.createElement('p');
    title.className = 'section-title';
    title.textContent = 'שאילתות חיפוש';
    container.appendChild(title);

    //רשימת השאילתות
    const rows = []
    let rowCounter = 0;

    //פונקציה המוסיפה שאילתה
    function addRow() {
        rowCounter++;
        const row = createCriteriaRow(onSubmitQueries, rowCounter);
        rows.push(row);
        container.appendChild(row.container);
    }

    //כפתור של הוספת שאילתה
    const addRowButton = document.createElement('button');
    addRowButton.type = 'button';
    addRowButton.className = 'btn-primary';
    addRowButton.textContent = 'הוסף שאילתה נוספת';
    addRowButton.addEventListener('click', addRow);
    container.appendChild(addRowButton);

    return container;
}

function createCriteriaRow(onSubmitQueries, rowNumber) {
    //אזור שאחראי על שאילתה מסוימת והתוצאה שלה
    const container = document.createElement('div');
    container.className = 'query-row';

    //אזור כותרת השאילתה
    const header = document.createElement('div');
    header.className = 'query-row-header';

    //כותרת- מספר השאילתה
    const rowTitle = document.createElement('span');
    rowTitle.className = 'query-row-title';
    rowTitle.textContent = `שאילתה ${rowNumber}`;
    header.appendChild(rowTitle);

    //כפתור מחיקת השאילתה
    const deleteRow = document.createElement('button')
    deleteRow.type = 'button';
    deleteRow.className = 'icon-btn';
    deleteRow.textContent = 'x';
    deleteRow.addEventListener('click', () => {
        container.remove();
    })
    header.appendChild(deleteRow);

    container.appendChild(header);

    //יוצר את כל תיבות הקלט של השאילתה
    const methodInputs = createMethodInputs();
    const senderInputs = createSenderInputs();
    const amountRange = createAmountRangeInputs();
    const dateRange = createDateRangeInputs();
    const missingFields = createMissingFieldsSelect();

    //מוסיף אותם לאזור של הפרטים
    container.appendChild(methodInputs.container);
    container.appendChild(senderInputs.container);
    container.appendChild(amountRange.container);
    container.appendChild(dateRange.container);
    container.appendChild(missingFields.container);


    //פעולות נוספות בשאילתה (כרגע יש רק 1 של הראה תוצאות)
    const actions = document.createElement('div');
    actions.className = 'query-row-actions';

    //כפתור שליחה
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'btn-primary';
    submitButton.textContent = 'הצג תוצאות';
    submitButton.addEventListener('click', () => {
        const criteria = {
            method: methodInputs.getValues(),
            sender: senderInputs.getValues(),
            startAmount: amountRange.getStart(),
            endAmount: amountRange.getEnd(),
            startDate: dateRange.getStart(),
            endDate: dateRange.getEnd(),
            missingFields: missingFields.getValues()
        };
        //שולח את כל התנאים בתיבת הקלט ואת האזור של התוצאות לדף שאחראי להראות אותם
        onSubmitQueries(criteria, resultContainer);
    })
    actions.appendChild(submitButton);
    container.appendChild(actions);

    //האזור האחראי על התוצאות
    const resultContainer = document.createElement('div')
    container.appendChild(resultContainer);

    //מחזיר את האזור הראשי ואת האזורים הפנימיים
    return {
        container: container,
        methodInputs: methodInputs,
        senderInputs: senderInputs,
        amountRange: amountRange,
        dateRange: dateRange,
        missingFields: missingFields,
        submitButton: submitButton,
        deleteRow: deleteRow,
        resultContainer: resultContainer
    }
}


function createMethodInputs() {
    //אזור תיבותת הקלט של המתודות
    const wrapper = document.createElement('div');
    wrapper.className = 'field-group';

    //תווית של כותרת של עמצעי תשלום
    const label = document.createElement('span');
    label.className = 'field-label';
    label.textContent = 'אמצעי תשלום';
    wrapper.appendChild(label);

    //רשימת תיבות הקלט של האמצעי תשלום
    const methodsInputs = [];

    //האזור של תיבות הקלט
    const row = document.createElement('div');
    row.className = 'multi-input-row';

    //הוספת עוד תיבה
    const addMethodButton = document.createElement('button');
    addMethodButton.type = 'button';
    addMethodButton.textContent = '+';
    addMethodButton.className = 'add-btn';
    addMethodButton.addEventListener('click', addmethodInput);

    row.appendChild(addMethodButton)
    wrapper.appendChild(row);

    //הוספת עוד תיבת קלט רק אם תיבת הקלט הקודמת מולאה
    function addmethodInput() {
        if (methodsInputs.length > 0 && methodsInputs[methodsInputs.length - 1].value === '') {
            return;
        }
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'לדוג: מזומן';
        methodsInputs.push(input);
        row.insertBefore(input, addMethodButton);
    }

    //מוסיף תיבה ראשונה
    addmethodInput();

    return {
        container: wrapper,
        getValues: () => methodsInputs.map(s => s.value)
    }
}

function createSenderInputs() {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-group';

    const label = document.createElement('span');
    label.className = 'field-label';
    label.textContent = 'שם השולח';
    wrapper.appendChild(label);

    const senderInputs = [];
    const row = document.createElement('div');
    row.className = 'multi-input-row';

    const addSenderButton = document.createElement('button');
    addSenderButton.type = 'button';
    addSenderButton.textContent = '+';
    addSenderButton.className = 'add-btn';
    addSenderButton.addEventListener('click', addSenderInput);
    row.appendChild(addSenderButton);


    function addSenderInput() {
        if (senderInputs.length > 0 && senderInputs[senderInputs.length - 1].value === '') {
            return;
        }
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'שם';
        senderInputs.push(input);
        row.insertBefore(input, addSenderButton);
    }

    addSenderInput();


    wrapper.appendChild(row)


    return {
        container: wrapper,
        getValues: () => senderInputs.map(s => s.value)
    }
}

function createAmountRangeInputs() {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-group';

    const label = document.createElement('span');
    label.className = 'field-label';
    label.textContent = 'טווח סכום';
    wrapper.appendChild(label);

    const row = document.createElement('div');
    row.className = 'range-group';

    const startAmountInput = document.createElement('input');
    startAmountInput.type = 'number';
    startAmountInput.placeholder = 'מסכום';

    const dash = document.createElement('span');
    dash.className = 'range-dash';
    dash.textContent = '—';

    const endAmountInput = document.createElement('input');
    endAmountInput.type = 'number';
    endAmountInput.placeholder = 'עד סכום';

    row.appendChild(startAmountInput);
    row.appendChild(dash);
    row.appendChild(endAmountInput);
    wrapper.appendChild(row);

    return {
        container: wrapper,
        getStart: () => startAmountInput.value,
        getEnd: () => endAmountInput.value
    }
}

function createDateRangeInputs() {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-group';

    const label = document.createElement('span');
    label.className = 'field-label';
    label.textContent = 'טווח תאריכים';
    wrapper.appendChild(label);

    const row = document.createElement('div');
    row.className = 'range-group';

    const startDateInput = document.createElement('input');
    startDateInput.type = 'date';

    const dash = document.createElement('span');
    dash.className = 'range-dash';
    dash.textContent = '—';

    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';

    row.appendChild(startDateInput);
    row.appendChild(dash);
    row.appendChild(endDateInput);
    wrapper.appendChild(row);

    return {
        container: wrapper,
        getStart: () => startDateInput.value,
        getEnd: () => endDateInput.value
    }
}

function createMissingFieldsSelect() {
    const wrapper = document.createElement('div');
    wrapper.className = 'field-group';

    const label = document.createElement('span');
    label.className = 'field-label';
    label.textContent = 'הראה רק תנועות עם שדות חסרים';
    wrapper.appendChild(label);

    const select = document.createElement('select');
    select.className = 'missing-select';
    select.multiple = true;

    const fieldsMap = { date: 'תאריך', amount: 'סכום', sender: 'שם', method: 'אמצעי', type: 'סוג' };
    Object.entries(fieldsMap).forEach(([value, text]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    });

    wrapper.appendChild(select);

    return {
        container: wrapper,
        select: select,
        getValues: () => Array.from(select.selectedOptions).map(o => o.value)
    }
}
