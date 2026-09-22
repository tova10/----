// אחראי על העלאת קובץ/קבצי אקסל ע"י המשתמש,
// והפעלת שרשרת הקריאה (excelReader -> normalizer -> transactionStore).

import { normalizeRows } from "../core/normalizer.js";
import {readExcelFile} from "../data/excelRender.js"


export function createFileUploadView(onFilesLoaded) {
    const container = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx, .xls, .csv';
    input.multiple = true;


    input.addEventListener('change', async (event) => {

        const files = Array.from(event.target.files);
        console.log(files);
        
        let allTransactions = []

        for (const file of files) {
            const rawRows = await readExcelFile(file);
            allTransactions=[...allTransactions,...normalizeRows(rawRows , file.name)]
        }
        onFilesLoaded(allTransactions)
    })

    container.appendChild(input);
    return container;
}

