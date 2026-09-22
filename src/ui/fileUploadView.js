// אחראי על העלאת קובץ/קבצי אקסל ע"י המשתמש,
// והפעלת שרשרת הקריאה (excelReader -> normalizer -> transactionStore).

import { normalizeRows } from "../core/normalizer.js";
import { readExcelFile } from "../data/excelRender.js"

export function createFileUploadView(onFilesLoaded, onFileRemoved, listOfFiles) {
    const container = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls, .csv';
    input.multiple = true;

    container.appendChild(input);

    if (listOfFiles) {
        for (const fileName of listOfFiles) {
            container.appendChild(createFileRow(fileName, onFileRemoved))
        }
    }



    input.addEventListener('change', async (event) => {
        const files = Array.from(event.target.files);
        let allTransactions = []

        for (const file of files) {
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

    const fileView = document.createElement('p');
    fileView.textContent = fileName;
    fileContainer.appendChild(fileView);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', () => {
        onFileRemoved(fileName, fileContainer)
    })
    fileContainer.appendChild(deleteButton);

    return fileContainer

}
