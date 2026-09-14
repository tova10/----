// קורא קובץ אקסל גולמי ומחזיר ממנו מערך שורות (כל שורה = אובייקט עם המפתחות כפי שהם באקסל).
// לא מבין ולא מפרש את הנתונים - רק מוציא אותם מהקובץ.

export async function readExcelFile(file) {
    const arrayBuffer = await file.arrayBuffer(); 
    const workbook = XLSX.read(arrayBuffer , {type : 'array'});

    const firstSheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[firstSheetName];

    const rows = XLSX.utils.sheet_to_json(sheet); //קוראת את הקובץ שיהיה עם כותרות

    return rows;
}