// נקודת הכניסה של האפליקציה - מחבר בין כל שכבות ה-UI,
// ומפעיל את סדר האתחול הראשוני של הדף.


import {createFileUploadView} from './fileUploadView.js'
import {createQueryFormView} from './quertFormView.js'


console.log("הדף נטען בהתחלה");


const view = createFileUploadView(files => {
    console.log(files);
});

const view2 =createQueryFormView(input=>{
    console.log(input)
})

document.body.appendChild(view)
document.body.appendChild(view2)


