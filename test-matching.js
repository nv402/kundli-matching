// Simple test to check if kundli matching is working
console.log("Testing kundli matching...");

// Test if we can create the engine
try {
    // Load the engine (simulate browser environment)
    const fs = require('fs');
    const engineCode = fs.readFileSync('kundli-engine.js', 'utf8');
    eval(engineCode);

    const engine = new KundliEngine();
    console.log("✓ Engine created successfully");

    // Test moon position calculation
    const groomPos = engine.calculateMoonPosition('1995-01-17', '04:10', 'Patna');
    const bridePos = engine.calculateMoonPosition('1997-03-12', '12:01', 'Gaya');

    console.log("✓ Moon positions calculated:");
    console.log("  Groom:", groomPos);
    console.log("  Bride:", bridePos);

    // Test guna matching
    const results = engine.calculateGunaMatching(groomPos, bridePos);
    console.log("✓ Guna matching completed:");
    console.log("  Total Score:", results.totalScore + "/36");
    console.log("  Compatibility:", results.compatibility.level);

    // Test individual gunas
    console.log("✓ Individual Guna scores:");
    Object.entries(results.results).forEach(([guna, data]) => {
        console.log(`  ${guna}: ${data.score}/${data.maxScore} - ${data.description}`);
    });

} catch (error) {
    console.error("✗ Error:", error.message);
    console.error(error.stack);
}