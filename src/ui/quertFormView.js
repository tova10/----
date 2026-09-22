// מציג טופס להזנת קריטריוני חיפוש (שם, אמצעי, טווח תאריכים),
// ומאפשר הוספת כמה טפסי שאילתה במקביל.

export function createQueryFormView(onSubmitQueries) {
    const container = document.createElement('div');

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


    const methodInput = document.createElement('input');
    methodInput.type = 'text';
    methodInput.placeholder = 'אמצעי תשלום';

    const senderInput = document.createElement('input');
    senderInput.type = 'text';
    senderInput.placeholder = 'שם';

    const startAmountInput = document.createElement('input');
    startAmountInput.type = 'number';
    startAmountInput.placeholder = 'מסכום';

    const endAmountInput = document.createElement('input');
    endAmountInput.type = 'number';
    endAmountInput.placeholder = 'עד סכום';

    const startDateInput = document.createElement('input');
    startDateInput.type = 'date';
    startDateInput.placeholder = 'מתאריך';

    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.placeholder = 'עד תאריך';

    const MissingFields = document.createElement('select');
    MissingFields.multiple = true;
    const fields = ["date", "amount", "sender", "method","type"];
    fields.forEach(field => {
        const option = document.createElement('option');
        option.value = field;
        option.textContent = field;
        MissingFields.appendChild(option);
    });


    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'הצג תוצאות';
    submitButton.addEventListener('click', () => {
        const criteria = {
            sender: senderInput.value,
            method: methodInput.value,
            startAmount: startAmountInput.value,
            endAmount: endAmountInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            missingFields: Array.from(MissingFields.selectedOptions).map(option => option.value)
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


    container.appendChild(methodInput);
    container.appendChild(senderInput);
    container.appendChild(startAmountInput);
    container.appendChild(endAmountInput);
    container.appendChild(startDateInput);
    container.appendChild(endDateInput);
    container.appendChild(MissingFields)
    container.appendChild(submitButton);
    container.appendChild(deleteRow)
    container.appendChild(resultContainer);



    return {
        container: container,
        methodInput: methodInput,
        senderInput: senderInput,
        startDateInput: startAmountInput,
        endDateInput: endAmountInput,
        startDateInput: startDateInput,
        endDateInput: endDateInput,
        MissingFields: MissingFields,
        submitButton: submitButton,
        deleteRow: deleteRow,
        resultContainer: resultContainer
    }
}