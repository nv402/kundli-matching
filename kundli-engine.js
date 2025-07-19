// Vedic Astrology Kundli Matching Engine
// Based on traditional Ashtakoot Guna Milan system

class KundliEngine {
    constructor() {
        // Nakshatra data with their lords and characteristics
        this.nakshatras = [
            { name: "Ashwini", lord: "Ketu", gana: "Deva", yoni: "Horse", nadi: "Vata" },
            { name: "Bharani", lord: "Venus", gana: "Manushya", yoni: "Elephant", nadi: "Vata" },
            { name: "Krittika", lord: "Sun", gana: "Rakshasa", yoni: "Sheep", nadi: "Kapha" },
            { name: "Rohini", lord: "Moon", gana: "Manushya", yoni: "Snake", nadi: "Kapha" },
            { name: "Mrigashira", lord: "Mars", gana: "Deva", yoni: "Snake", nadi: "Pitta" },
            { name: "Ardra", lord: "Rahu", gana: "Manushya", yoni: "Dog", nadi: "Vata" },
            { name: "Punarvasu", lord: "Jupiter", gana: "Deva", yoni: "Cat", nadi: "Vata" },
            { name: "Pushya", lord: "Saturn", gana: "Deva", yoni: "Sheep", nadi: "Pitta" },
            { name: "Ashlesha", lord: "Mercury", gana: "Rakshasa", yoni: "Cat", nadi: "Kapha" },
            { name: "Magha", lord: "Ketu", gana: "Rakshasa", yoni: "Rat", nadi: "Kapha" },
            { name: "Purva Phalguni", lord: "Venus", gana: "Manushya", yoni: "Rat", nadi: "Pitta" },
            { name: "Uttara Phalguni", lord: "Sun", gana: "Manushya", yoni: "Cow", nadi: "Vata" },
            { name: "Hasta", lord: "Moon", gana: "Deva", yoni: "Buffalo", nadi: "Vata" },
            { name: "Chitra", lord: "Mars", gana: "Rakshasa", yoni: "Tiger", nadi: "Pitta" },
            { name: "Swati", lord: "Rahu", gana: "Deva", yoni: "Buffalo", nadi: "Kapha" },
            { name: "Vishakha", lord: "Jupiter", gana: "Rakshasa", yoni: "Tiger", nadi: "Kapha" },
            { name: "Anuradha", lord: "Saturn", gana: "Deva", yoni: "Deer", nadi: "Pitta" },
            { name: "Jyeshtha", lord: "Mercury", gana: "Rakshasa", yoni: "Deer", nadi: "Vata" },
            { name: "Mula", lord: "Ketu", gana: "Rakshasa", yoni: "Dog", nadi: "Vata" },
            { name: "Purva Ashadha", lord: "Venus", gana: "Manushya", yoni: "Monkey", nadi: "Pitta" },
            { name: "Uttara Ashadha", lord: "Sun", gana: "Manushya", yoni: "Mongoose", nadi: "Kapha" },
            { name: "Shravana", lord: "Moon", gana: "Deva", yoni: "Monkey", nadi: "Kapha" },
            { name: "Dhanishta", lord: "Mars", gana: "Rakshasa", yoni: "Lion", nadi: "Pitta" },
            { name: "Shatabhisha", lord: "Rahu", gana: "Rakshasa", yoni: "Horse", nadi: "Vata" },
            { name: "Purva Bhadrapada", lord: "Jupiter", gana: "Manushya", yoni: "Lion", nadi: "Vata" },
            { name: "Uttara Bhadrapada", lord: "Saturn", gana: "Manushya", yoni: "Cow", nadi: "Pitta" },
            { name: "Revati", lord: "Mercury", gana: "Deva", yoni: "Elephant", nadi: "Kapha" }
        ];

        // Rashi (Zodiac signs) data
        this.rashis = [
            "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
            "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
        ];
    }

    // Calculate Moon's position based on birth details (simplified calculation)
    calculateMoonPosition(date, time, place) {
        // This is a simplified calculation - in real implementation, 
        // you'd use precise ephemeris data and geographical coordinates
        const birthDate = new Date(date + 'T' + time);
        const daysSinceEpoch = Math.floor(birthDate.getTime() / (1000 * 60 * 60 * 24));

        // Simplified lunar position calculation
        const lunarDegree = (daysSinceEpoch * 13.176) % 360;
        const nakshatra = Math.floor(lunarDegree / 13.333333);
        const rashi = Math.floor(lunarDegree / 30);

        return {
            nakshatra: nakshatra % 27,
            rashi: rashi % 12,
            degree: lunarDegree % 30
        };
    }

    // Ashtakoot Guna Milan - 8 compatibility factors
    calculateGunaMatching(groom, bride) {
        const results = {
            varna: this.calculateVarna(groom, bride),
            vashya: this.calculateVashya(groom, bride),
            tara: this.calculateTara(groom, bride),
            yoni: this.calculateYoni(groom, bride),
            graha_maitri: this.calculateGrahaMaitri(groom, bride),
            gana: this.calculateGana(groom, bride),
            bhakoot: this.calculateBhakoot(groom, bride),
            nadi: this.calculateNadi(groom, bride)
        };

        const totalScore = Object.values(results).reduce((sum, result) => sum + result.score, 0);

        return {
            results,
            totalScore,
            maxScore: 36,
            compatibility: this.getCompatibilityLevel(totalScore)
        };
    }

    // Varna Koot (1 point) - Caste compatibility
    calculateVarna(groom, bride) {
        const groomNakshatra = this.nakshatras[groom.nakshatra];
        const brideNakshatra = this.nakshatras[bride.nakshatra];

        const varnaOrder = { "Brahmin": 4, "Kshatriya": 3, "Vaishya": 2, "Shudra": 1 };
        const groomVarna = this.getNakshatraVarna(groomNakshatra.name);
        const brideVarna = this.getNakshatraVarna(brideNakshatra.name);

        const score = varnaOrder[groomVarna] >= varnaOrder[brideVarna] ? 1 : 0;

        return {
            score,
            maxScore: 1,
            description: `Groom: ${groomVarna}, Bride: ${brideVarna}`,
            compatible: score === 1
        };
    }

    // Vashya Koot (2 points) - Mutual attraction and control
    calculateVashya(groom, bride) {
        // Corrected Vashya groups based on traditional texts
        const vashyaGroups = {
            "Chatushpad": [0, 3, 7, 8, 11, 12], // Four-legged (Ashwini, Rohini, Pushya, Ashlesha, Hasta, Chitra)
            "Manav": [1, 4, 5, 6, 13, 14, 15], // Human (Bharani, Mrigashira, Ardra, Punarvasu, Swati, Vishakha, Anuradha)
            "Jalachhar": [2, 9, 10], // Water creatures (Krittika, Magha, Purva Phalguni)
            "Keet": [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26] // Insects (remaining)
        };

        let groomGroup = null, brideGroup = null;

        for (const [group, nakshatras] of Object.entries(vashyaGroups)) {
            if (nakshatras.includes(groom.nakshatra)) groomGroup = group;
            if (nakshatras.includes(bride.nakshatra)) brideGroup = group;
        }

        // More nuanced scoring
        let score = 0;
        if (groomGroup === brideGroup) {
            score = 2;
        } else if ((groomGroup === "Manav" && brideGroup === "Chatushpad") ||
            (groomGroup === "Chatushpad" && brideGroup === "Manav")) {
            score = 1; // Partial compatibility
        }

        return {
            score,
            maxScore: 2,
            description: `Groom: ${groomGroup}, Bride: ${brideGroup}`,
            compatible: score >= 1
        };
    }

    // Tara Koot (3 points) - Birth star compatibility
    calculateTara(groom, bride) {
        // Calculate from bride's nakshatra to groom's nakshatra
        let diff = (groom.nakshatra - bride.nakshatra + 27) % 27;
        if (diff === 0) diff = 27;
        const taraNumber = ((diff - 1) % 9) + 1;

        const taraNames = [
            "Janma", "Sampat", "Vipat", "Kshema", "Pratyak",
            "Sadhana", "Vadha", "Mitra", "Param Mitra"
        ];

        // Scoring based on traditional system
        const taraScores = {
            1: 3, // Janma - excellent
            2: 1, // Sampat - good but reduced score
            3: 0, // Vipat - inauspicious
            4: 3, // Kshema - excellent
            5: 0, // Pratyak - inauspicious
            6: 1, // Sadhana - average
            7: 0, // Vadha - very inauspicious
            8: 3, // Mitra - excellent
            9: 1  // Param Mitra - good
        };

        const score = taraScores[taraNumber] || 0;

        return {
            score,
            maxScore: 3,
            description: `${taraNames[taraNumber - 1]} Tara (${taraNumber})`,
            compatible: score >= 1
        };
    }

    // Yoni Koot (4 points) - Sexual compatibility
    calculateYoni(groom, bride) {
        const groomYoni = this.nakshatras[groom.nakshatra].yoni;
        const brideYoni = this.nakshatras[bride.nakshatra].yoni;

        const yoniCompatibility = {
            "Horse": { "Horse": 4, "Buffalo": 2, "Tiger": 1, "Dog": 2, "Snake": 3 },
            "Elephant": { "Elephant": 4, "Lion": 2, "Dog": 1, "Rat": 0 },
            "Sheep": { "Sheep": 4, "Monkey": 2, "Snake": 1 },
            "Snake": { "Snake": 4, "Monkey": 3, "Horse": 3, "Sheep": 1 },
            "Dog": { "Dog": 4, "Rabbit": 2, "Horse": 2, "Elephant": 1 },
            "Cat": { "Cat": 4, "Rat": 0, "Monkey": 2 },
            "Rat": { "Rat": 4, "Buffalo": 2, "Cat": 0, "Elephant": 0 },
            "Cow": { "Cow": 4, "Tiger": 0, "Lion": 2 },
            "Buffalo": { "Buffalo": 4, "Horse": 2, "Rat": 2, "Tiger": 1 },
            "Tiger": { "Tiger": 4, "Deer": 1, "Buffalo": 1, "Cow": 0 },
            "Deer": { "Deer": 4, "Tiger": 1, "Monkey": 2 },
            "Monkey": { "Monkey": 4, "Snake": 3, "Sheep": 2, "Deer": 2, "Cat": 2 },
            "Mongoose": { "Mongoose": 4, "Snake": 0 },
            "Lion": { "Lion": 4, "Elephant": 2, "Cow": 2 }
        };

        const score = yoniCompatibility[groomYoni]?.[brideYoni] || 0;

        return {
            score,
            maxScore: 4,
            description: `Groom: ${groomYoni}, Bride: ${brideYoni}`,
            compatible: score >= 2
        };
    }

    // Graha Maitri Koot (5 points) - Planetary friendship
    calculateGrahaMaitri(groom, bride) {
        const groomLord = this.nakshatras[groom.nakshatra].lord;
        const brideLord = this.nakshatras[bride.nakshatra].lord;

        const planetFriendship = {
            "Sun": { friends: ["Moon", "Mars", "Jupiter"], enemies: ["Venus", "Saturn"], neutral: ["Mercury"] },
            "Moon": { friends: ["Sun", "Mercury"], enemies: [], neutral: ["Mars", "Jupiter", "Venus", "Saturn"] },
            "Mars": { friends: ["Sun", "Moon", "Jupiter"], enemies: ["Mercury"], neutral: ["Venus", "Saturn"] },
            "Mercury": { friends: ["Sun", "Venus"], enemies: ["Moon"], neutral: ["Mars", "Jupiter", "Saturn"] },
            "Jupiter": { friends: ["Sun", "Moon", "Mars"], enemies: ["Mercury", "Venus"], neutral: ["Saturn"] },
            "Venus": { friends: ["Mercury", "Saturn"], enemies: ["Sun", "Moon"], neutral: ["Mars", "Jupiter"] },
            "Saturn": { friends: ["Mercury", "Venus"], enemies: ["Sun", "Moon", "Mars"], neutral: ["Jupiter"] },
            "Rahu": { friends: ["Mercury", "Venus", "Saturn"], enemies: ["Sun", "Moon", "Mars"], neutral: ["Jupiter"] },
            "Ketu": { friends: ["Mars", "Venus", "Saturn"], enemies: ["Sun", "Moon"], neutral: ["Mercury", "Jupiter"] }
        };

        let score = 0;
        if (groomLord === brideLord) {
            score = 5;
        } else if (planetFriendship[groomLord]?.friends.includes(brideLord)) {
            score = 4;
        } else if (planetFriendship[groomLord]?.neutral.includes(brideLord)) {
            score = 3;
        } else {
            score = 0;
        }

        return {
            score,
            maxScore: 5,
            description: `Groom's lord: ${groomLord}, Bride's lord: ${brideLord}`,
            compatible: score >= 3
        };
    }

    // Gana Koot (6 points) - Temperament compatibility
    calculateGana(groom, bride) {
        const groomGana = this.nakshatras[groom.nakshatra].gana;
        const brideGana = this.nakshatras[bride.nakshatra].gana;

        const ganaCompatibility = {
            "Deva": { "Deva": 6, "Manushya": 5, "Rakshasa": 0 },
            "Manushya": { "Deva": 5, "Manushya": 6, "Rakshasa": 0 },
            "Rakshasa": { "Deva": 0, "Manushya": 0, "Rakshasa": 6 }
        };

        const score = ganaCompatibility[groomGana][brideGana];

        return {
            score,
            maxScore: 6,
            description: `Groom: ${groomGana}, Bride: ${brideGana}`,
            compatible: score >= 3
        };
    }

    // Bhakoot Koot (7 points) - Rashi compatibility
    calculateBhakoot(groom, bride) {
        const groomRashi = groom.rashi;
        const brideRashi = bride.rashi;

        // Calculate position difference (counting from bride to groom)
        let diff = (groomRashi - brideRashi + 12) % 12;
        if (diff === 0) diff = 12;

        // Traditional incompatible positions
        const incompatiblePositions = [2, 6, 8, 12]; // Dwirdwadash and Shashtashtam doshas

        let score = 7;
        let doshaType = null;

        if (incompatiblePositions.includes(diff)) {
            score = 0;
            if (diff === 2 || diff === 12) {
                doshaType = "Dwirdwadash Dosha";
            } else if (diff === 6 || diff === 8) {
                doshaType = "Shashtashtam Dosha";
            }
        }

        return {
            score,
            maxScore: 7,
            description: `Groom: ${this.rashis[groomRashi]}, Bride: ${this.rashis[brideRashi]}${doshaType ? ` (${doshaType})` : ''}`,
            compatible: score === 7,
            dosha: doshaType
        };
    }

    // Nadi Koot (8 points) - Health and progeny
    calculateNadi(groom, bride) {
        const groomNadi = this.nakshatras[groom.nakshatra].nadi;
        const brideNadi = this.nakshatras[bride.nakshatra].nadi;

        const score = groomNadi !== brideNadi ? 8 : 0;

        return {
            score,
            maxScore: 8,
            description: `Groom: ${groomNadi}, Bride: ${brideNadi}`,
            compatible: score === 8
        };
    }

    // Helper methods
    getNakshatraVarna(nakshatra) {
        const varnaMapping = {
            "Ashwini": "Vaishya", "Bharani": "Kshatriya", "Krittika": "Brahmin",
            "Rohini": "Shudra", "Mrigashira": "Vaishya", "Ardra": "Shudra",
            "Punarvasu": "Vaishya", "Pushya": "Kshatriya", "Ashlesha": "Kshatriya",
            "Magha": "Shudra", "Purva Phalguni": "Brahmin", "Uttara Phalguni": "Kshatriya",
            "Hasta": "Vaishya", "Chitra": "Shudra", "Swati": "Brahmin",
            "Vishakha": "Kshatriya", "Anuradha": "Vaishya", "Jyeshtha": "Shudra",
            "Mula": "Brahmin", "Purva Ashadha": "Kshatriya", "Uttara Ashadha": "Vaishya",
            "Shravana": "Shudra", "Dhanishta": "Brahmin", "Shatabhisha": "Kshatriya",
            "Purva Bhadrapada": "Vaishya", "Uttara Bhadrapada": "Shudra", "Revati": "Brahmin"
        };
        return varnaMapping[nakshatra] || "Vaishya";
    }

    getCompatibilityLevel(score) {
        if (score >= 28) return { level: "Excellent", class: "excellent" };
        if (score >= 21) return { level: "Good", class: "good" };
        if (score >= 14) return { level: "Average", class: "average" };
        return { level: "Poor", class: "poor" };
    }

    generateRecommendations(results) {
        const recommendations = [];
        const { totalScore, results: gunaResults } = results;

        if (totalScore >= 28) {
            recommendations.push("Excellent compatibility! This is considered a very auspicious match.");
        } else if (totalScore >= 21) {
            recommendations.push("Good compatibility. The marriage is likely to be harmonious.");
        } else if (totalScore >= 14) {
            recommendations.push("Average compatibility. Consider performing remedial measures.");
        } else {
            recommendations.push("Low compatibility. Consult with an experienced astrologer for guidance.");
        }

        // Specific recommendations based on individual guna scores
        if (gunaResults.nadi.score === 0) {
            recommendations.push("⚠️ Nadi Dosha present. This requires special attention and remedies.");
        }

        if (gunaResults.bhakoot.score === 0) {
            recommendations.push("⚠️ Bhakoot Dosha present. Consider astrological remedies.");
        }

        if (gunaResults.gana.score === 0) {
            recommendations.push("⚠️ Gana Dosha present. Temperament differences may need attention.");
        }

        return recommendations;
    }
}