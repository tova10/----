// מציג טופס להזנת קריטריוני חיפוש (שם, אמצעי, טווח תאריכים),
// ומאפשר הוספת כמה טפסי שאילתה במקביל.


export function createQueryFormView(onSubmitQueries) {
    const container = document.createElement('div');
    //רשימת השאילתות
    const rows = []

    //הכפתורים של הוספת שאילתה
    const addRowButton = document.createElement('button');
    addRowButton.type = 'button';
    addRowButton.textContent = 'הוסף שאילתה נוספת';
    addRowButton.addEventListener('click', addRow);
    container.appendChild(addRowButton);

    //הוספת שאילתה
    function addRow() {
        const row = createCriteriaRow(onSubmitQueries);
        rows.push(row);
        container.appendChild(row.container);
    }
    //הוספת שאילתה ראשונה
    addRow()

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
        const allCriteria = {
            sender: senderInput.value,
            method: methodInput.value,
            startDate: startDateInput.value,
            endDate: endDateInput.value
        }
        onSubmitQueries([allCriteria])
    })

    container.appendChild(methodInput);
    container.appendChild(senderInput);
    container.appendChild(endDateInput);
    container.appendChild(startDateInput);
    container.appendChild(submitButton)


    return {
        container: container,
        methodInput: methodInput,
        senderInput: senderInput,
        startDateInput: startDateInput,
        endDateInput: endDateInput,
        submitButton: submitButton
    }
}