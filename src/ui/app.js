// נקודת הכניסה של האפליקציה - מחבר בין כל שכבות ה-UI,
// ומפעיל את סדר האתחול הראשוני של הדף.


import {createFileUploadView} from './fileUploadView.js'

console.log("הדף נטען בהתחלה");


const view = createFileUploadView(files => {
    console.log(files);
});

document.body.appendChild(view)

