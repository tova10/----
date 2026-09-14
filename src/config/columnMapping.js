// קובץ המיפוי בין כותרות עמודות באקסל (כמו שהן מופיעות בקובץ בפועל)
// לבין שמות השדות האחידים שהמערכת עובדת איתם (date, sender, method...).
// זה הקובץ היחיד שצריך לשנות כשמחליפים קובץ אקסל עם כותרות שונות.


export const columnMapping = {

    date : ["תאריך", "Posting Date"],
    amount : ["   Amount   " , "Amount"],
    sender : [" From / To  (Donor Co)"],
    method : [" Payment type "],
    type : ["Details"],
    // description : ["Description"]


};  


