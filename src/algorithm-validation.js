// Algorithm Validation and Testing Suite
// Validates against traditional Vedic astrology principles

class AlgorithmValidator {
    constructor() {
        this.engine = new KundliEngine();
        this.validationResults = [];
    }

    // Complete and corrected Nakshatra data validation
    validateNakshatraData() {
        console.log("🔍 Validating Nakshatra Data...");

        // Correct Nakshatra data according to traditional texts
        const correctNakshatraData = [
            { name: "Ashwini", lord: "Ketu", gana: "Deva", yoni: "Horse", nadi: "Vata", varna: "Vaishya" },
            { name: "Bharani", lord: "Venus", gana: "Manushya", yoni: "Elephant", nadi: "Vata", varna: "Kshatriya" },
            { name: "Krittika", lord: "Sun", gana: "Rakshasa", yoni: "Sheep", nadi: "Kapha", varna: "Brahmin" },
            { name: "Rohini", lord: "Moon", gana: "Manushya", yoni: "Snake", nadi: "Kapha", varna: "Shudra" },
            { name: "Mrigashira", lord: "Mars", gana: "Deva", yoni: "Snake", nadi: "Pitta", varna: "Vaishya" },
            { name: "Ardra", lord: "Rahu", gana: "Manushya", yoni: "Dog", nadi: "Vata", varna: "Shudra" },
            { name: "Punarvasu", lord: "Jupiter", gana: "Deva", yoni: "Cat", nadi: "Vata", varna: "Vaishya" },
            { name: "Pushya", lord: "Saturn", gana: "Deva", yoni: "Sheep", nadi: "Pitta", varna: "Kshatriya" },
            { name: "Ashlesha", lord: "Mercury", gana: "Rakshasa", yoni: "Cat", nadi: "Kapha", varna: "Kshatriya" },
            { name: "Magha", lord: "Ketu", gana: "Rakshasa", yoni: "Rat", nadi: "Kapha", varna: "Shudra" },
            { name: "Purva Phalguni", lord: "Venus", gana: "Manushya", yoni: "Rat", nadi: "Pitta", varna: "Brahmin" },
            { name: "Uttara Phalguni", lord: "Sun", gana: "Manushya", yoni: "Cow", nadi: "Vata", varna: "Kshatriya" },
            { name: "Hasta", lord: "Moon", gana: "Deva", yoni: "Buffalo", nadi: "Vata", varna: "Vaishya" },
            { name: "Chitra", lord: "Mars", gana: "Rakshasa", yoni: "Tiger", nadi: "Pitta", varna: "Shudra" },
            { name: "Swati", lord: "Rahu", gana: "Deva", yoni: "Buffalo", nadi: "Kapha", varna: "Brahmin" },
            { name: "Vishakha", lord: "Jupiter", gana: "Rakshasa", yoni: "Tiger", nadi: "Kapha", varna: "Kshatriya" },
            { name: "Anuradha", lord: "Saturn", gana: "Deva", yoni: "Deer", nadi: "Pitta", varna: "Vaishya" },
            { name: "Jyeshtha", lord: "Mercury", gana: "Rakshasa", yoni: "Deer", nadi: "Vata", varna: "Shudra" },
            { name: "Mula", lord: "Ketu", gana: "Rakshasa", yoni: "Dog", nadi: "Vata", varna: "Brahmin" },
            { name: "Purva Ashadha", lord: "Venus", gana: "Manushya", yoni: "Monkey", nadi: "Pitta", varna: "Kshatriya" },
            { name: "Uttara Ashadha", lord: "Sun", gana: "Manushya", yoni: "Mongoose", nadi: "Kapha", varna: "Vaishya" },
            { name: "Shravana", lord: "Moon", gana: "Deva", yoni: "Monkey", nadi: "Kapha", varna: "Shudra" },
            { name: "Dhanishta", lord: "Mars", gana: "Rakshasa", yoni: "Lion", nadi: "Pitta", varna: "Brahmin" },
            { name: "Shatabhisha", lord: "Rahu", gana: "Rakshasa", yoni: "Horse", nadi: "Vata", varna: "Kshatriya" },
            { name: "Purva Bhadrapada", lord: "Jupiter", gana: "Manushya", yoni: "Lion", nadi: "Vata", varna: "Vaishya" },
            { name: "Uttara Bhadrapada", lord: "Saturn", gana: "Manushya", yoni: "Cow", nadi: "Pitta", varna: "Shudra" },
            { name: "Revati", lord: "Mercury", gana: "Deva", yoni: "Elephant", nadi: "Kapha", varna: "Brahmin" }
        ];

        let errors = [];

        // Validate each nakshatra
        this.engine.nakshatras.forEach((nakshatra, index) => {
            const correct = correctNakshatraData[index];
            if (nakshatra.name !== correct.name) {
                errors.push(`Nakshatra ${index}: Name mismatch - ${nakshatra.name} vs ${correct.name}`);
            }
            if (nakshatra.lord !== correct.lord) {
                errors.push(`${nakshatra.name}: Lord mismatch - ${nakshatra.lord} vs ${correct.lord}`);
            }
            if (nakshatra.gana !== correct.gana) {
                errors.push(`${nakshatra.name}: Gana mismatch - ${nakshatra.gana} vs ${correct.gana}`);
            }
            if (nakshatra.yoni !== correct.yoni) {
                errors.push(`${nakshatra.name}: Yoni mismatch - ${nakshatra.yoni} vs ${correct.yoni}`);
            }
            if (nakshatra.nadi !== correct.nadi) {
                errors.push(`${nakshatra.name}: Nadi mismatch - ${nakshatra.nadi} vs ${correct.nadi}`);
            }
        });

        if (errors.length === 0) {
            console.log("✅ Nakshatra data validation passed");
        } else {
            console.log("❌ Nakshatra data validation failed:");
            errors.forEach(error => console.log("  " + error));
        }

        return errors.length === 0;
    }

    // Test known compatibility cases
    testKnownCases() {
        console.log("\n🧪 Testing Known Compatibility Cases...");

        const testCases = [
            {
                name: "Perfect Match Case",
                groom: { nakshatra: 0, rashi: 0 }, // Ashwini
                bride: { nakshatra: 0, rashi: 0 }, // Ashwini
                expectedScore: 36, // Should be perfect match
                description: "Same nakshatra should give maximum compatibility"
            },
            {
                name: "Nadi Dosha Case",
                groom: { nakshatra: 0, rashi: 0 }, // Ashwini (Vata)
                bride: { nakshatra: 5, rashi: 2 }, // Ardra (Vata)
                expectedNadiScore: 0,
                description: "Same Nadi should result in Nadi Dosha"
            },
            {
                name: "Gana Dosha Case",
                groom: { nakshatra: 0, rashi: 0 }, // Ashwini (Deva)
                bride: { nakshatra: 2, rashi: 0 }, // Krittika (Rakshasa)
                expectedGanaScore: 0,
                description: "Deva-Rakshasa combination should result in Gana Dosha"
            }
        ];

        testCases.forEach(testCase => {
            console.log(`\n  Testing: ${testCase.name}`);
            const result = this.engine.calculateGunaMatching(testCase.groom, testCase.bride);

            if (testCase.expectedScore) {
                const passed = result.totalScore === testCase.expectedScore;
                console.log(`    Expected: ${testCase.expectedScore}, Got: ${result.totalScore} ${passed ? '✅' : '❌'}`);
            }

            if (testCase.expectedNadiScore !== undefined) {
                const passed = result.results.nadi.score === testCase.expectedNadiScore;
                console.log(`    Nadi Score - Expected: ${testCase.expectedNadiScore}, Got: ${result.results.nadi.score} ${passed ? '✅' : '❌'}`);
            }

            if (testCase.expectedGanaScore !== undefined) {
                const passed = result.results.gana.score === testCase.expectedGanaScore;
                console.log(`    Gana Score - Expected: ${testCase.expectedGanaScore}, Got: ${result.results.gana.score} ${passed ? '✅' : '❌'}`);
            }

            console.log(`    Description: ${testCase.description}`);
        });
    }

    // Validate Tara calculation
    validateTaraCalculation() {
        console.log("\n🌟 Validating Tara Calculation...");

        // Traditional Tara system
        const taraNames = [
            "Janma", "Sampat", "Vipat", "Kshema", "Pratyak",
            "Sadhana", "Vadha", "Mitra", "Param Mitra"
        ];

        const favorableTaras = [1, 3, 5, 7]; // Janma, Sampat, Kshema, Mitra
        const unfavorableTaras = [2, 4, 6, 8]; // Vipat, Pratyak, Sadhana, Vadha

        // Test cases for Tara calculation
        const testCases = [
            { groom: 0, bride: 0, expectedTara: 1, shouldBeFavorable: true }, // Same nakshatra
            { groom: 0, bride: 2, expectedTara: 3, shouldBeFavorable: true }, // 2 positions apart
            { groom: 0, bride: 1, expectedTara: 2, shouldBeFavorable: false }, // 1 position apart
        ];

        testCases.forEach((testCase, index) => {
            const diff = Math.abs(testCase.groom - testCase.bride);
            const taraNumber = (diff % 9) + 1;
            const isFavorable = favorableTaras.includes(taraNumber);

            console.log(`  Test ${index + 1}:`);
            console.log(`    Groom: ${testCase.groom}, Bride: ${testCase.bride}`);
            console.log(`    Calculated Tara: ${taraNumber} (${taraNames[taraNumber - 1]})`);
            console.log(`    Expected: ${testCase.expectedTara}, Favorable: ${testCase.shouldBeFavorable}`);
            console.log(`    Result: ${taraNumber === testCase.expectedTara && isFavorable === testCase.shouldBeFavorable ? '✅' : '❌'}`);
        });
    }

    // Validate Bhakoot calculation
    validateBhakootCalculation() {
        console.log("\n🏠 Validating Bhakoot Calculation...");

        // Traditional Bhakoot incompatible positions
        const incompatiblePositions = [
            { positions: [2, 12], name: "Dwirdwadash" },
            { positions: [6, 8], name: "Shashtashtam" }
        ];

        console.log("  Incompatible Rashi combinations:");
        incompatiblePositions.forEach(combo => {
            console.log(`    ${combo.name}: ${combo.positions[0]} and ${combo.positions[1]} positions apart`);
        });

        // Test specific cases
        const testCases = [
            { groom: 0, bride: 1, shouldBeCompatible: false, reason: "2nd position (Dwirdwadash)" },
            { groom: 0, bride: 5, shouldBeCompatible: false, reason: "6th position (Shashtashtam)" },
            { groom: 0, bride: 2, shouldBeCompatible: true, reason: "3rd position (compatible)" }
        ];

        testCases.forEach((testCase, index) => {
            const diff = Math.abs(testCase.groom - testCase.bride);
            const incompatibleDiffs = [5, 6, 7, 1, 11]; // Current algorithm
            const isCompatible = !incompatibleDiffs.includes(diff);

            console.log(`  Test ${index + 1}:`);
            console.log(`    Groom Rashi: ${testCase.groom}, Bride Rashi: ${testCase.bride}`);
            console.log(`    Difference: ${diff}, Expected: ${testCase.shouldBeCompatible ? 'Compatible' : 'Incompatible'}`);
            console.log(`    Reason: ${testCase.reason}`);
            console.log(`    Result: ${isCompatible === testCase.shouldBeCompatible ? '✅' : '❌'}`);
        });
    }

    // Validate Yoni compatibility matrix
    validateYoniCompatibility() {
        console.log("\n🐾 Validating Yoni Compatibility...");

        // Traditional enemy pairs
        const enemyPairs = [
            ["Cat", "Rat"],
            ["Elephant", "Lion"],
            ["Horse", "Buffalo"],
            ["Dog", "Monkey"],
            ["Snake", "Mongoose"],
            ["Tiger", "Cow"]
        ];

        console.log("  Traditional enemy pairs:");
        enemyPairs.forEach(pair => {
            console.log(`    ${pair[0]} - ${pair[1]}`);
        });

        // Test enemy pairs in our algorithm
        enemyPairs.forEach(pair => {
            const groom = { nakshatra: this.findNakshatraByYoni(pair[0]) };
            const bride = { nakshatra: this.findNakshatraByYoni(pair[1]) };

            if (groom.nakshatra !== -1 && bride.nakshatra !== -1) {
                const result = this.engine.calculateYoni(groom, bride);
                console.log(`    ${pair[0]} - ${pair[1]}: Score ${result.score}/4 ${result.score === 0 ? '✅' : '❌'}`);
            }
        });
    }

    // Helper method to find nakshatra by yoni
    findNakshatraByYoni(yoni) {
        const index = this.engine.nakshatras.findIndex(n => n.yoni === yoni);
        return index;
    }

    // Comprehensive validation
    runFullValidation() {
        console.log("🚀 Starting Comprehensive Algorithm Validation\n");
        console.log("=".repeat(60));

        const validations = [
            () => this.validateNakshatraData(),
            () => this.testKnownCases(),
            () => this.validateTaraCalculation(),
            () => this.validateBhakootCalculation(),
            () => this.validateYoniCompatibility()
        ];

        validations.forEach(validation => {
            try {
                validation();
            } catch (error) {
                console.log(`❌ Validation failed: ${error.message}`);
            }
        });

        console.log("\n" + "=".repeat(60));
        console.log("🏁 Validation Complete");

        // Generate improvement recommendations
        this.generateImprovementRecommendations();
    }

    generateImprovementRecommendations() {
        console.log("\n📋 Algorithm Improvement Recommendations:");

        const recommendations = [
            "1. Moon position calculation needs precise ephemeris data for accuracy",
            "2. Add geographical coordinates consideration for birth place",
            "3. Implement Mangal Dosha (Mars affliction) checking",
            "4. Add Sarpa Dosha and other specific doshas",
            "5. Include divisional chart (D9/Navamsa) analysis",
            "6. Add planetary strength (Shadbala) calculations",
            "7. Implement remedial measures suggestions",
            "8. Add detailed compatibility explanations",
            "9. Include timing analysis for marriage (Muhurta)",
            "10. Add regional variations in calculations"
        ];

        recommendations.forEach(rec => console.log(`  ${rec}`));
    }
}

// Run validation when this file is loaded
if (typeof window !== 'undefined') {
    // Browser environment
    window.addEventListener('load', () => {
        const validator = new AlgorithmValidator();
        validator.runFullValidation();
    });
} else {
    // Node.js environment
    const validator = new AlgorithmValidator();
    validator.runFullValidation();
}