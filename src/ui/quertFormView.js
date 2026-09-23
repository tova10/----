// מציג טופס להזנת קריטריוני חיפוש (שם, אמצעי, טווח תאריכים),
// ומאפשר הוספת כמה טפסי שאילתה במקביל.

export function createQueryFormView(onSubmitQueries) {
    const container = document.createElement('div');
    container.className = 'section-block';
    const rows = []

    function addRow() {
        const row = createCriteriaRow(onSubmitQueries);
        rows.push(row);
        container.appendChild(row.container);
    }

    //הכפתורים של הוספת שאילתה
    const addRowButton = document.createElement('button');
    addRowButton.type = 'button';
    addRowButton.textContent = 'הוסף שאילתה נוספת';
    addRowButton.addEventListener('click', addRow);
    container.appendChild(addRowButton);

    return container;
}


function createCriteriaRow(onSubmitQueries) {
    const container = document.createElement('div');
    container.className = 'query-row';
    const methodInputs = createMethodInputs();
    const senderInputs = createSenderInputs();
    const amountRange = createAmountRangeInputs();
    const dateRange = createDateRangeInputs();
    const missingFields = createMissingFieldsSelect();

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'הצג תוצאות';
    submitButton.addEventListener('click', () => {
        const criteria = {
            method: methodInputs.getValues(),
            sender: senderInputs.getValues(),
            startAmount: amountRange.getStart(),
            endAmount: amountRange.getEnd(),
            startDate: dateRange.getStart(),
            endDate: dateRange.getEnd(),
            missingFields: Array.from(missingFields.selectedOptions).map(option => option.value)
        };

        onSubmitQueries(criteria, resultContainer);
    })


    const deleteRow = document.createElement('button')
    deleteRow.type = 'button';
    deleteRow.textContent = 'מחק שאילתה';
    deleteRow.addEventListener('click', () => {
        container.remove();
    })


    const resultContainer = document.createElement('div')
resultContainer.className = 'result-wrapper';

    container.appendChild(methodInputs.container);
    container.appendChild(senderInputs.container);
    container.appendChild(amountRange.container);
    container.appendChild(dateRange.container);
    container.appendChild(missingFields);
    container.appendChild(submitButton);
    container.appendChild(deleteRow)
    container.appendChild(resultContainer);



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

    const methodsInputs = [];
    const methodsContainer = document.createElement('div');

    function addmethodInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'אמצעי תשלום';
        methodsInputs.push(input);
        methodsContainer.appendChild(input);
    }

    addmethodInput();

    const addSenderButton = document.createElement('button');
    addSenderButton.type = 'button';
    addSenderButton.textContent = '+';
    addSenderButton.addEventListener('click', addmethodInput);
    methodsContainer.appendChild(addSenderButton)

    return {
        container: methodsContainer,
        getValues: () => methodsInputs.map(s => s.value)
    }
}

function createSenderInputs() {
    const senderInputs = [];
    const sendersContainer = document.createElement('div');

    function addSenderInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'שם';
        senderInputs.push(input);
        sendersContainer.appendChild(input);
    }

    addSenderInput();

    const addSenderButton = document.createElement('button');
    addSenderButton.type = 'button';
    addSenderButton.textContent = '+';
    addSenderButton.addEventListener('click', addSenderInput);
    sendersContainer.appendChild(addSenderButton)


    return {
        container: sendersContainer,
        getValues: () => senderInputs.map(s => s.value)
    }
}

function createAmountRangeInputs() {
    const container = document.createElement('div');

    const startAmountInput = document.createElement('input');
    startAmountInput.type = 'number';
    startAmountInput.placeholder = 'מסכום';

    const endAmountInput = document.createElement('input');
    endAmountInput.type = 'number';
    endAmountInput.placeholder = 'עד סכום';

    container.appendChild(startAmountInput);
    container.appendChild(endAmountInput);

    return {
        container: container,
        getStart: () => startAmountInput.value,
        getEnd: () => endAmountInput.value
    }
}

function createDateRangeInputs() {
    const container = document.createElement('div');

    const startDateInput = document.createElement('input');
    startDateInput.type = 'date';
    startDateInput.placeholder = 'מתאריך';

    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.placeholder = 'עד תאריך';

    container.appendChild(startDateInput);
    container.appendChild(endDateInput);

    return {
        container: container,
        getStart: () => startDateInput.value,
        getEnd: () => endDateInput.value
    }
}

function createMissingFieldsSelect() {
    const MissingFields = document.createElement('select');
    MissingFields.multiple = true;
    const fields = ["date", "amount", "sender", "method", "type"];
    fields.forEach(field => {
        const option = document.createElement('option');
        option.value = field;
        option.textContent = field;
        MissingFields.appendChild(option);
    });
    return MissingFields
}