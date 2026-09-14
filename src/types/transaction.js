// קובץ תיעוד בלבד - מגדיר איך נראית "תנועה" אחידה במערכת (Transaction)
// ומה המבנה של תוצאת שאילתה (Result Object).
// אין כאן קוד רץ - רק הגדרות מבנה לשימוש כל שאר הקבצים.


/**
 * @typedef {Object} Transaction
 * 
 * @property {string} date  
 * @property {number} amount
 * @property {string} [sender]
 * @property {string} [method] - שיטת התשלום (כרטיס אשראי, העברה בנקאית, מזומן...)
 * @property {"income"|"expense"} [type] - סוג התנועה (הכנסה או הוצאה)
//  * @property {string} [description] - תיאור התנועה (למשל "תשלום עבור שירותי ייעוץ")
 * 
 * @property {Array<string>} emptyDetails - רשימת שדות ריקים (למשל אם אין מספר חשבון או תיאור)
 * @property {string} sourceFile    - שם הקובץ שממנו נלקחה התנועה
 * 
 * @typedef {Object} ResultObject
 * 
 * @property {Array<Transaction>} transactions - רשימת התנועות שנמצאו
 * @property {Array<string>} errors - רשימת שגיאות שנמצאו במהלך העיבוד
 * @property {Array<string>} warnings - רשימת אזהרות שנמצאו במהלך העיבוד    
 * 
 */
