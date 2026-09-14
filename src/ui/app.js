// נקודת הכניסה של האפליקציה - מחבר בין כל שכבות ה-UI,
// ומפעיל את סדר האתחול הראשוני של הדף.

import { createFileUploadView } from './fileUploadView.js';
import { createQueryFormView } from './queryFormView.js';
import { createResultsView } from './resultsView.js';
import { transactionStore } from '../core/transactionStore.js';
import { runMultipleQueries } from '../core/queryEngine.js'; 


export const transactionStore = new TransactionStore();

console.log("הדף נטען בהתחלה");


const view = createFileUploadView(files => {
    console.log(files);
    
    transactionStore.addTransactions(files)
});

const view2 =createQueryFormView(input=>{
    console.log(input)
    
    const response = runMultipleQueries(transactionStore.getAllTransactions(),input)
})

document.body.appendChild();


document.body.appendChild(view)
document.body.appendChild(view2)


