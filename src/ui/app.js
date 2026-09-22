// נקודת הכניסה של האפליקציה - מחבר בין כל שכבות ה-UI,
// ומפעיל את סדר האתחול הראשוני של הדף.


import { createFileUploadView } from './fileUploadView.js'
import { createQueryFormView } from './quertFormView.js'
import { renderResult } from './resultsView.js';
import { runMultipleQueries, runQuery } from '../core/queryEngine.js';
import { TransactionStore } from '../core/transavtionStore.js';


console.log("הדף נטען בהתחלה");

const transactionStore = new TransactionStore();

const view = createFileUploadView(files => {
    transactionStore.addTransactions(files)
});

const view2 = createQueryFormView((criteriaList, resultContainer) => {
    const results = runQuery(transactionStore.getAllTransactions(), criteriaList);
    resultContainer.innerHTML = '';
    resultContainer.appendChild(renderResult(results))
});


document.body.appendChild(view)
document.body.appendChild(view2)


