// Simple syntax validation for app.js
const fs = require('fs');

try {
    const appCode = fs.readFileSync('app.js', 'utf8');

    // Check for basic syntax issues
    console.log("Checking app.js syntax...");

    // Count braces
    const openBraces = (appCode.match(/{/g) || []).length;
    const closeBraces = (appCode.match(/}/g) || []).length;
    console.log(`Open braces: ${openBraces}, Close braces: ${closeBraces}`);

    if (openBraces !== closeBraces) {
        console.log("❌ Brace mismatch detected!");
    } else {
        console.log("✅ Braces are balanced");
    }

    // Check for function definitions
    const functions = appCode.match(/function\s+\w+/g) || [];
    console.log("Functions found:", functions);

    // Check for window assignments
    const windowAssignments = appCode.match(/window\.\w+\s*=/g) || [];
    console.log("Window assignments:", windowAssignments);

    console.log("✅ Basic syntax check completed");

} catch (error) {
    console.error("❌ Error reading app.js:", error.message);
}