// אחראי על העלאת קובץ/קבצי אקסל ע"י המשתמש,
// והפעלת שרשרת הקריאה (excelReader -> normalizer -> transactionStore).

import { normalizeRows } from "../core/normalizer.js";
import { readExcelFile } from "../data/excelRender.js"

export function createFileUploadView(onFilesLoaded, onFileRemoved, listOfFiles) {
    //ראשי
    const container = document.createElement('div');
    container.className = 'section-block';

    //כותרת לחלק הקבצים
    const title = document.createElement('p');
    title.className = 'section-title';
    title.textContent = 'קבצי נתונים';
    container.appendChild(title);


    //אחראי על הכפתור עצמו
    const inputId = 'file-upload-' + Math.random().toString(36).slice(2);

    const label = document.createElement('label');
    label.className = 'file-upload-label';
    label.setAttribute('for', inputId);
    label.textContent = '+ הוסף קובץ';

    const input = document.createElement('input');
    input.type = 'file';
    input.id = inputId;
    input.className = 'file-upload-input';
    input.accept = '.xlsx, .xls, .csv';
    input.multiple = true;

    container.appendChild(label);
    container.appendChild(input);


    //אזור הקבצים הקיימים
    const fileList = document.createElement('div');
    fileList.className = 'file-list';
    container.appendChild(fileList);


    //כל הקבצים הקיימים כבר     
    if (listOfFiles()) {
        for (const fileName of listOfFiles()) {
            container.appendChild(createFileRow(fileName, onFileRemoved))
        }
    }


    //מה קורה כשמעלים קבצים
    input.addEventListener('change', async (event) => {
        const files = Array.from(event.target.files);
        let allTransactions = []

        for (const file of files) {
            if (listOfFiles().includes(file.name)) {
                continue
            }
            const rawRows = await readExcelFile(file);
            allTransactions = [...allTransactions, ...normalizeRows(rawRows, file.name)]            
            container.appendChild(createFileRow(file.name, onFileRemoved))
        }
        onFilesLoaded(allTransactions)
    })


    return container;
}

function createFileRow(fileName, onFileRemoved) {

    const fileContainer = document.createElement('div');
    fileContainer.className = 'file-row';

    const nameWrapper = document.createElement('span');
    nameWrapper.className = 'file-name';
    nameWrapper.innerHTML = `<span class="file-icon">📄</span> ${fileName}`;
    fileContainer.appendChild(nameWrapper);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'icon-btn';
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', () => {
        onFileRemoved(fileName, fileContainer)
    })
    fileContainer.appendChild(deleteButton);

    return fileContainer
}
