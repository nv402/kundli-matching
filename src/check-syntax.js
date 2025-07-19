// Check for syntax issues in app.js
const fs = require('fs');

try {
    const code = fs.readFileSync('app.js', 'utf8');

    // Check parentheses balance
    let parenCount = 0;
    let braceCount = 0;
    let bracketCount = 0;

    for (let i = 0; i < code.length; i++) {
        const char = code[i];

        if (char === '(') parenCount++;
        else if (char === ')') parenCount--;
        else if (char === '{') braceCount++;
        else if (char === '}') braceCount--;
        else if (char === '[') bracketCount++;
        else if (char === ']') bracketCount--;

        // Check for immediate imbalance
        if (parenCount < 0) {
            const lineNum = code.substring(0, i).split('\n').length;
            console.log(`❌ Extra closing parenthesis at line ${lineNum}`);
            console.log(`Context: ${code.substring(Math.max(0, i - 20), i + 20)}`);
            break;
        }
    }

    console.log(`Parentheses balance: ${parenCount}`);
    console.log(`Braces balance: ${braceCount}`);
    console.log(`Brackets balance: ${bracketCount}`);

    if (parenCount === 0 && braceCount === 0 && bracketCount === 0) {
        console.log("✅ All brackets are balanced");
    } else {
        console.log("❌ Bracket imbalance detected");
    }

} catch (error) {
    console.error("Error:", error.message);
}