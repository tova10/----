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

    addRow()

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

    const endDateInput = document.createElement('input');
    endDateInput.type = 'text';
    endDateInput.placeholder = 'עד תאריך';

    const startDateInput = document.createElement('input');
    startDateInput.type = 'text';
    startDateInput.placeholder = 'מתאריך';

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'הצג תוצאות';
    submitButton.addEventListener('click', () => {
        const criteria = { sender: senderInput.value, method: methodInput.value, startDate: startDateInput.value, endDate: endDateInput.value };
        onSubmitQueries([criteria], resultContainer);
    })

    const resultContainer = document.createElement('div')


    container.appendChild(methodInput);
    container.appendChild(senderInput);
    container.appendChild(endDateInput);
    container.appendChild(startDateInput);
    container.appendChild(submitButton);
    container.appendChild(resultContainer);



    return {
        container: container,
        methodInput: methodInput,
        senderInput: senderInput,
        startDateInput: startDateInput,
        endDateInput: endDateInput,
        submitButton: submitButton,
        resultContainer: resultContainer
    }
}