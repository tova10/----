// build.js
// סקריפט שמאחד את כל קבצי ה-JS וה-CSS של הפרויקט לקובץ HTML יחיד,
// שאפשר לפתוח בלחיצה כפולה או לשלוח למישהו בלי שרת.
//
// שימוש:
//   1. להניח את הקובץ הזה בתיקיית השורש של הפרויקט (איפה ש-index.html נמצא)
//   2. להריץ בטרמינל, מתוך אותה תיקייה:   node build.js
//   3. הקובץ הסופי ייווצר בשם: build-output.html

const fs = require('fs');
const path = require('path');

// --- כאן מגדירים אילו קבצים להכניס, ובאיזה סדר (תלויות קודם) ---
const JS_FILES = [
    'src/config/columnMapping.js',
    'src/data/excelRender.js',
    'src/core/normalizer.js',
    'src/core/transavtionStore.js',
    'src/core/filters.js',
    'src/core/queryEngine.js',
    'src/ui/fileUploadView.js',
    'src/ui/quertFormView.js',
    'src/ui/resultsView.js',
    'src/ui/app.js', // תמיד אחרון - הוא "מפעיל" את השאר
];

const CSS_FILE = 'styles.css';
const OUTPUT_FILE = 'build-output.html';
const PAGE_TITLE = 'קריאת אקסל';

// --- לוגיקת המיזוג עצמה ---

function stripImportsAndExports(code) {
    // מוחק שורות import שלמות
    code = code.replace(/^import .*\n/gm, '');
    // מוריד את המילה export (לפני function/const/class), בלי לגעת בשאר השורה
    code = code.replace(/\bexport (async function|function|const|class)\b/g, '$1');
    return code;
}

function readFileSafe(relativePath) {
    const fullPath = path.join(__dirname, relativePath);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`הקובץ לא נמצא: ${relativePath}\nודאי שהסקריפט נמצא באותה תיקייה כמו src/ ו-styles.css`);
    }
    return fs.readFileSync(fullPath, 'utf-8');
}

function buildMergedJs() {
    return JS_FILES.map(file => {
        const raw = readFileSafe(file);
        const cleaned = stripImportsAndExports(raw);
        return `\n// ===== ${file} =====\n${cleaned.trim()}\n`;
    }).join('\n');
}

function buildHtml() {
    const css = readFileSafe(CSS_FILE);
    const js = buildMergedJs();

    return `<!DOCTYPE html>
<html lang="he" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
    <title>${PAGE_TITLE}</title>
    <style>
${css}
    </style>
</head>

<body>

    <h1>${PAGE_TITLE}</h1>

    <script>
${js}
    </script>

</body>

</html>
`;
}

// --- הרצה ---

try {
    const html = buildHtml();
    fs.writeFileSync(path.join(__dirname, OUTPUT_FILE), html, 'utf-8');
    console.log(`✅ נוצר בהצלחה: ${OUTPUT_FILE}`);
} catch (err) {
    console.error('❌ שגיאה בבנייה:');
    console.error(err.message);
}
