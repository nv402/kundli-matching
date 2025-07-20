// Minimal version of app.js to test basic functionality
const kundliEngine = new KundliEngine();

function performMatching() {
    console.log("performMatching function called");

    try {
        // Get form data
        const groomData = {
            name: document.getElementById('groomName').value,
            dob: document.getElementById('groomDob').value,
            tob: document.getElementById('groomTob').value,
            place: document.getElementById('groomPlace').value
        };

        const brideData = {
            name: document.getElementById('brideName').value,
            dob: document.getElementById('brideDob').value,
            tob: document.getElementById('brideTob').value,
            place: document.getElementById('bridePlace').value
        };

        console.log("Form data collected:", groomData, brideData);

        // Validate inputs
        if (!validateInputs(groomData, brideData)) {
            console.log("Validation failed");
            alert('Please fill in all required fields');
            return;
        }

        console.log("Validation passed");

        // Calculate moon positions
        console.log("Calculating moon positions...");
        const groomPosition = kundliEngine.calculateMoonPosition(groomData.dob, groomData.tob, groomData.place);
        const bridePosition = kundliEngine.calculateMoonPosition(brideData.dob, brideData.tob, brideData.place);
        console.log("Moon positions:", groomPosition, bridePosition);

        // Perform Guna matching
        console.log("Performing guna matching...");
        const matchingResults = kundliEngine.calculateGunaMatching(groomPosition, bridePosition);
        console.log("Matching results:", matchingResults);

        // Display simple results
        displaySimpleResults(matchingResults, groomData, brideData, groomPosition, bridePosition);

    } catch (error) {
        console.error("Error in performMatching:", error);
        alert("An error occurred while matching kundli: " + error.message);
    }
}

function validateInputs(groom, bride) {
    return groom.name && groom.dob && groom.tob && groom.place &&
        bride.name && bride.dob && bride.tob && bride.place;
}

function displaySimpleResults(results, groomData, brideData, groomPos, bridePos) {
    console.log("displaySimpleResults function called");

    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) {
        console.error("Results container not found");
        return;
    }

    resultsContainer.style.display = 'block';

    const percentage = Math.round((results.totalScore / results.maxScore) * 100);

    resultsContainer.innerHTML =
        '<div class="results-header">' +
        '<h2>Compatibility Results</h2>' +
        '<button id="downloadPdfBtn" onclick="downloadPDF()" class="download-btn">📄 Download PDF Report</button>' +
        '</div>' +

        '<div class="score-display">' +
        '<div class="score-circle" style="--score-deg: ' + (percentage * 3.6) + 'deg;">' +
        '<div class="score-inner">' +
        '<div style="font-size: 2em; font-weight: bold; color: #333;">' + results.totalScore + '/36</div>' +
        '<div style="color: #666;">Guna Score</div>' +
        '<div style="font-weight: bold; margin-top: 5px; padding: 4px 8px; border-radius: 4px; background: ' + getScoreCircleColor(results.compatibility.class) + '; color: white;">' +
        results.compatibility.level +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="text-align: center; margin-top: 20px;">' +
        '<h3>' + groomData.name + ' & ' + brideData.name + '</h3>' +
        '<p>Compatibility: ' + percentage + '%</p>' +
        '</div>' +
        '</div>' +

        '<div class="birth-details">' +
        '<h3 style="color: var(--text-primary);">Birth Details</h3>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">' +
        '<div>' +
        '<h4 style="color: var(--text-primary);">' + groomData.name + ' (Groom)</h4>' +
        '<p style="color: var(--text-secondary);">Nakshatra: ' + kundliEngine.nakshatras[groomPos.nakshatra].name + '</p>' +
        '<p style="color: var(--text-secondary);">Rashi: ' + kundliEngine.rashis[groomPos.rashi] + '</p>' +
        '<p style="color: var(--text-secondary);">Birth Date: ' + groomData.dob + '</p>' +
        '<p style="color: var(--text-secondary);">Birth Time: ' + groomData.tob + '</p>' +
        '</div>' +
        '<div>' +
        '<h4 style="color: var(--text-primary);">' + brideData.name + ' (Bride)</h4>' +
        '<p style="color: var(--text-secondary);">Nakshatra: ' + kundliEngine.nakshatras[bridePos.nakshatra].name + '</p>' +
        '<p style="color: var(--text-secondary);">Rashi: ' + kundliEngine.rashis[bridePos.rashi] + '</p>' +
        '<p style="color: var(--text-secondary);">Birth Date: ' + brideData.dob + '</p>' +
        '<p style="color: var(--text-secondary);">Birth Time: ' + brideData.tob + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="detailed-results">' +
        Object.entries(results.results).map(function ([guna, data]) {
            const cardBgColor = getScoreColor(data.score, data.maxScore);
            const textColor = getTextColor(data.score, data.maxScore);
            return '<div class="guna-card clickable-card" onclick="toggleGunaDetails(\'' + guna + '\')" style="background: ' + cardBgColor + '; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); cursor: pointer; border: 2px solid ' + textColor + '20; transition: all 0.3s ease;">' +
                '<div class="guna-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">' +
                '<div style="display: flex; align-items: center; gap: 10px;">' +
                '<h4 style="margin: 0; color: ' + textColor + ';">' + getGunaDisplayName(guna) + '</h4>' +
                '<span class="expand-icon" id="icon-' + guna + '" style="font-size: 0.8em; color: ' + textColor + ';">▼</span>' +
                '</div>' +
                '<span class="guna-score-colored" style="font-weight: bold; padding: 8px 12px; border-radius: 5px; background: var(--card-bg); color: ' + textColor + '; border: 2px solid ' + textColor + ';">' +
                data.score + '/' + data.maxScore +
                '</span>' +
                '</div>' +
                '<p style="margin: 10px 0; color: ' + textColor + ';">' + data.description + '</p>' +
                '<div style="margin-top: 10px;">' +
                '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                '<span style="font-size: 0.9em; color: ' + textColor + ';">Score: ' + data.score + ' points</span>' +
                '<span style="font-size: 0.9em; color: ' + textColor + ';">Max: ' + data.maxScore + ' points</span>' +
                '</div>' +
                '<div style="margin-top: 8px;">' +
                '<div style="background: rgba(255,255,255,0.5); height: 8px; border-radius: 4px; overflow: hidden;">' +
                '<div style="background: ' + textColor + '; height: 100%; width: ' + Math.round((data.score / data.maxScore) * 100) + '%; transition: width 0.3s ease;"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="guna-detailed-info" id="details-' + guna + '" style="display: none; margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">' +
                getDetailedGunaInfo(guna, data, groomPos, bridePos) +
                '</div>' +
                '</div>';
        }).join('') +
        '</div>' +

        '<div class="individual-koot-section" style="margin-top: 30px;">' +
        '<h2 style="text-align: center; margin-bottom: 20px; color: var(--text-primary);">Individual Astrological Profile</h2>' +
        '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">' +
        '<div class="groom-profile">' +
        '<h3 style="text-align: center; margin-bottom: 20px; color: #2196f3;">' + groomData.name + ' (Groom)</h3>' +
        generateIndividualKootCards(groomPos, groomData, 'groom') +
        '</div>' +
        '<div class="bride-profile">' +
        '<h3 style="text-align: center; margin-bottom: 20px; color: #e91e63;">' + brideData.name + ' (Bride)</h3>' +
        generateIndividualKootCards(bridePos, brideData, 'bride') +
        '</div>' +
        '</div>' +
        '</div>' +

        '<div class="recommendations">' +
        '<h3 style="color: var(--text-primary);">Recommendations</h3>' +
        '<div style="margin-top: 15px;">' +
        getRecommendations(results).map(function (rec) {
            return '<p style="margin: 10px 0; color: var(--text-secondary);">• ' + rec + '</p>';
        }).join('') +
        '</div>' +
        '<div style="margin-top: 20px; padding: 15px; background: var(--bg-tertiary); border-radius: 5px; border-left: 4px solid #2196f3; border: 1px solid var(--border-color);">' +
        '<strong style="color: var(--text-primary);">Note:</strong> <span style="color: var(--text-secondary);">This analysis is based on traditional Vedic astrology principles. ' +
        'For detailed consultation and remedies, please consult with a qualified astrologer.</span>' +
        '</div>' +
        '</div>';

    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Helper functions for display
function getScoreColor(score, maxScore) {
    const percentage = (score / maxScore) * 100;

    // Define color stops for gradient from red to green
    if (percentage === 0) {
        return '#ffebee'; // Light red for 0%
    } else if (percentage <= 25) {
        return '#ffcdd2'; // Light red-pink for 1-25%
    } else if (percentage <= 50) {
        return '#fff3e0'; // Light orange for 26-50%
    } else if (percentage <= 75) {
        return '#fff8e1'; // Light yellow for 51-75%
    } else if (percentage < 100) {
        return '#f1f8e9'; // Light green for 76-99%
    } else {
        return '#e8f5e8'; // Full green for 100%
    }
}

function getTextColor(score, maxScore) {
    const percentage = (score / maxScore) * 100;

    // Darker text colors that complement the background
    if (percentage === 0) {
        return '#c62828'; // Dark red
    } else if (percentage <= 25) {
        return '#d32f2f'; // Red
    } else if (percentage <= 50) {
        return '#f57c00'; // Orange
    } else if (percentage <= 75) {
        return '#f9a825'; // Yellow-orange
    } else if (percentage < 100) {
        return '#689f38'; // Light green
    } else {
        return '#388e3c'; // Full green
    }
}

function getScoreCircleColor(compatibilityClass) {
    // Return solid background colors for good contrast in score circle
    switch (compatibilityClass) {
        case 'excellent':
            return '#28a745'; // Green
        case 'good':
            return '#17a2b8'; // Blue
        case 'average':
            return '#ffc107'; // Yellow
        case 'poor':
            return '#dc3545'; // Red
        default:
            return '#6c757d'; // Gray
    }
}

function getGunaDisplayName(guna) {
    const gunaNames = {
        varna: 'Varna Koot',
        vashya: 'Vashya Koot',
        tara: 'Tara Koot',
        yoni: 'Yoni Koot',
        graha_maitri: 'Graha Maitri Koot',
        gana: 'Gana Koot',
        bhakoot: 'Bhakoot Koot',
        nadi: 'Nadi Koot'
    };
    return gunaNames[guna] || guna.toUpperCase();
}

function getRecommendations(results) {
    const recommendations = [];
    const totalScore = results.totalScore;
    const gunaResults = results.results;

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

// Generate individual Koot cards for bride/groom
function generateIndividualKootCards(position, personData, role) {
    const nakshatra = kundliEngine.nakshatras[position.nakshatra];
    const rashi = kundliEngine.rashis[position.rashi];

    const kootData = {
        varna: getVarnaInfo(nakshatra.name, role),
        vashya: getVashyaInfo(position.nakshatra, role),
        gana: getGanaInfo(nakshatra.gana, role),
        yoni: getYoniInfo(nakshatra.yoni, role),
        nadi: getNadiInfo(nakshatra.nadi, role),
        graha: getGrahaInfo(nakshatra.lord, role),
        nakshatra: getNakshatraInfo(nakshatra, role),
        rashi: getRashiInfo(rashi, role)
    };

    return Object.entries(kootData).map(([key, info]) => {
        return '<div class="individual-koot-card" style="background: var(--card-bg); padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid ' + (role === 'groom' ? '#2196f3' : '#e91e63') + '; box-shadow: 0 2px 4px var(--shadow);">' +
            '<h4 style="color: var(--text-primary); margin-bottom: 8px;">' + info.title + '</h4>' +
            '<p style="color: var(--text-secondary); font-size: 0.9em; margin-bottom: 8px;"><strong>' + info.value + '</strong></p>' +
            '<p style="color: var(--text-secondary); font-size: 0.85em; line-height: 1.4;">' + info.meaning + '</p>' +
            '</div>';
    }).join('');
}

// Individual Koot information functions
function getVarnaInfo(nakshatra, role) {
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

    const varna = varnaMapping[nakshatra] || "Vaishya";
    const meanings = {
        "Brahmin": role === 'groom' ?
            "You have a spiritual and intellectual nature. You're naturally inclined towards learning, teaching, and guiding others. In marriage, you'll likely be the philosophical guide." :
            "You possess wisdom and spiritual depth. You bring intellectual stimulation to relationships and value meaningful conversations and spiritual growth together.",
        "Kshatriya": role === 'groom' ?
            "You have leadership qualities and protective instincts. You're naturally brave and take charge in difficult situations. You'll be the protector and decision-maker in marriage." :
            "You have a strong, courageous nature. You're independent and can handle challenges well. You'll be a supportive partner who stands by your spouse through difficulties.",
        "Vaishya": role === 'groom' ?
            "You're practical and business-minded. You have good skills in managing resources and creating prosperity. You'll focus on building material security for your family." :
            "You're practical and resourceful. You have a good sense of managing household affairs and contributing to family prosperity. You value stability and comfort.",
        "Shudra": role === 'groom' ?
            "You're service-oriented and hardworking. You find fulfillment in helping others and working with your hands. You'll be dedicated to serving your family's needs." :
            "You're caring and service-minded. You find joy in taking care of others and creating a comfortable home environment. You're naturally nurturing and supportive."
    };

    return {
        title: "Varna (Spiritual Nature)",
        value: varna,
        meaning: meanings[varna]
    };
}

function getVashyaInfo(nakshatraIndex, role) {
    const vashyaGroups = {
        "Chatushpad": [0, 3, 7, 8, 11, 12],
        "Manav": [1, 4, 5, 6, 13, 14, 15],
        "Jalachhar": [2, 9, 10],
        "Keet": [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]
    };

    let group = "Manav";
    for (const [groupName, nakshatras] of Object.entries(vashyaGroups)) {
        if (nakshatras.includes(nakshatraIndex)) {
            group = groupName;
            break;
        }
    }

    const meanings = {
        "Chatushpad": role === 'groom' ?
            "You have a stable, grounded nature like four-legged animals. You're reliable, practical, and prefer steady progress. In relationships, you provide security and consistency." :
            "You're naturally stable and dependable. You prefer security and routine, and you're attracted to partners who can provide emotional and material stability.",
        "Manav": role === 'groom' ?
            "You have balanced human qualities - neither too aggressive nor too passive. You're adaptable and can relate well to different types of people. You're a good communicator in relationships." :
            "You have a balanced, adaptable nature. You can adjust to different situations and people easily. You're socially comfortable and make relationships work through understanding.",
        "Jalachhar": role === 'groom' ?
            "You have a fluid, emotional nature like water creatures. You're intuitive, sensitive, and go with the flow. In marriage, you'll be emotionally supportive and understanding." :
            "You're emotionally intuitive and sensitive. You understand feelings deeply and can adapt to your partner's emotional needs. You bring emotional depth to relationships.",
        "Keet": role === 'groom' ?
            "You have an active, restless nature like insects. You're always moving, working, and achieving. You bring energy and dynamism to your marriage, always striving for progress." :
            "You're naturally active and energetic. You like to stay busy and accomplish things. You'll bring enthusiasm and motivation to your relationship, encouraging growth and activity."
    };

    return {
        title: "Vashya (Behavioral Nature)",
        value: group,
        meaning: meanings[group]
    };
}

function getGanaInfo(gana, role) {
    const meanings = {
        "Deva": role === 'groom' ?
            "You have divine qualities - you're naturally good, generous, and spiritual. You prefer harmony over conflict and always try to do the right thing. You'll be a considerate, caring husband." :
            "You have a divine, pure nature. You're naturally kind, generous, and avoid conflicts. You bring peace and positivity to relationships and prefer harmonious environments.",
        "Manushya": role === 'groom' ?
            "You have balanced human qualities. You can be both gentle and firm as needed. You understand practical life well and can handle both material and spiritual aspects of marriage." :
            "You have a well-balanced nature. You understand both practical and emotional needs in relationships. You're neither too aggressive nor too passive, making you easy to live with.",
        "Rakshasa": role === 'groom' ?
            "You have strong, assertive qualities. You're ambitious, determined, and can be aggressive when needed. You'll be a strong protector and provider, though you may need to control your temper." :
            "You have a strong, independent nature. You're ambitious and determined to achieve your goals. While you can be assertive, you're also fiercely loyal and protective of loved ones."
    };

    return {
        title: "Gana (Temperament)",
        value: gana,
        meaning: meanings[gana]
    };
}

function getYoniInfo(yoni, role) {
    const meanings = {
        "Horse": role === 'groom' ?
            "You have a free-spirited, energetic nature. You value independence and adventure. In marriage, you need a partner who understands your need for freedom while building a strong bond." :
            "You're independent and energetic. You value freedom and don't like being controlled. You're attracted to partners who are confident and give you space while maintaining intimacy.",
        "Elephant": role === 'groom' ?
            "You're wise, strong, and protective. You have a majestic presence and natural leadership. You'll be a reliable provider who protects and guides your family with wisdom." :
            "You're wise and strong-willed. You have natural dignity and prefer quality over quantity in relationships. You're attracted to partners who respect your intelligence and strength.",
        "Sheep": role === 'groom' ?
            "You're gentle, peaceful, and nurturing. You prefer harmony and avoid conflicts. You'll be a caring, supportive husband who creates a peaceful home environment." :
            "You're naturally gentle and peace-loving. You're nurturing and caring, preferring harmony in relationships. You're attracted to partners who are kind and understanding.",
        "Snake": role === 'groom' ?
            "You're mysterious, intuitive, and transformative. You have deep wisdom and can sense things others miss. In marriage, you'll bring depth and spiritual insight." :
            "You're intuitive and mysterious. You have deep emotional intelligence and can understand hidden meanings. You're attracted to partners who appreciate your depth and complexity.",
        "Dog": role === 'groom' ?
            "You're loyal, faithful, and protective. Once committed, you're completely devoted. You'll be a trustworthy husband who always stands by your family through all circumstances." :
            "You're naturally loyal and faithful. You value trust and commitment above all. You're attracted to partners who are honest and reliable, and you give your complete devotion in return.",
        "Cat": role === 'groom' ?
            "You're independent, selective, and graceful. You choose your relationships carefully and value quality over quantity. You'll be an affectionate but independent partner." :
            "You're independent and selective in relationships. You're graceful and prefer quality connections. You're attracted to partners who respect your independence while being affectionate.",
        "Rat": role === 'groom' ?
            "You're quick-thinking, adaptable, and resourceful. You can handle any situation with intelligence. In marriage, you'll be the problem-solver who finds creative solutions." :
            "You're intelligent and adaptable. You can adjust to different situations quickly and find practical solutions. You're attracted to partners who appreciate your cleverness and resourcefulness.",
        "Cow": role === 'groom' ?
            "You're gentle, giving, and nurturing. You have a motherly/fatherly nature and love to care for others. You'll create a warm, loving home environment for your family." :
            "You're naturally nurturing and giving. You have a maternal instinct and love to care for others. You're attracted to partners who appreciate your caring nature and reciprocate your love.",
        "Buffalo": role === 'groom' ?
            "You're strong, hardworking, and determined. You have great endurance and can work steadily towards goals. You'll be a reliable provider who builds security through persistent effort." :
            "You're strong and hardworking. You have great determination and can persevere through difficulties. You're attracted to partners who appreciate your strength and dedication.",
        "Tiger": role === 'groom' ?
            "You're powerful, passionate, and dominant. You have natural leadership and can be quite intense. In marriage, you'll be a strong protector but need to balance your assertiveness." :
            "You're naturally powerful and passionate. You have strong opinions and can be quite intense in relationships. You're attracted to partners who can match your strength and passion.",
        "Deer": role === 'groom' ?
            "You're gentle, artistic, and sensitive. You have refined tastes and appreciate beauty. You'll bring creativity and sensitivity to your marriage, creating an aesthetically pleasing environment." :
            "You're gentle and artistic. You have refined sensibilities and appreciate beauty in all forms. You're attracted to partners who share your aesthetic sense and emotional sensitivity.",
        "Monkey": role === 'groom' ?
            "You're playful, intelligent, and curious. You love learning new things and can adapt quickly. In marriage, you'll bring fun, intelligence, and variety to keep the relationship interesting." :
            "You're naturally playful and intelligent. You're curious about life and love variety. You're attracted to partners who can match your wit and enjoy intellectual conversations and fun activities.",
        "Mongoose": role === 'groom' ?
            "You're alert, protective, and brave. You can sense danger and protect your loved ones. You'll be a vigilant guardian of your family, always watching out for their welfare." :
            "You're naturally alert and protective. You have good instincts about people and situations. You're attracted to partners who make you feel secure and who appreciate your protective nature.",
        "Lion": role === 'groom' ?
            "You're royal, confident, and commanding. You have natural leadership and expect respect. In marriage, you'll be the head of the family who leads with dignity and strength." :
            "You're naturally confident and regal. You have leadership qualities and expect to be treated with respect. You're attracted to partners who admire your strength and can complement your royal nature."
    };

    return {
        title: "Yoni (Physical Nature)",
        value: yoni,
        meaning: meanings[yoni] || "You have unique characteristics that make you special in relationships."
    };
}

function getNadiInfo(nadi, role) {
    const meanings = {
        "Vata": role === 'groom' ?
            "You have an active, energetic constitution. You're quick-thinking, creative, and always on the move. For health, you need regular routine, warm foods, and stress management." :
            "You have a Vata constitution - active and energetic. You're creative and quick-thinking but may be prone to anxiety. You need stability, routine, and calming influences for good health.",
        "Pitta": role === 'groom' ?
            "You have a fiery, intense constitution. You're ambitious, focused, and have strong digestion. For health, you need cooling foods, moderate exercise, and emotional balance." :
            "You have a Pitta constitution - fiery and intense. You're ambitious and focused but may be prone to anger or stress. You need cooling influences and emotional balance for optimal health.",
        "Kapha": role === 'groom' ?
            "You have a stable, strong constitution. You're calm, patient, and have good endurance. For health, you need regular exercise, light foods, and stimulation to avoid lethargy." :
            "You have a Kapha constitution - stable and strong. You're naturally calm and patient but may be prone to weight gain or lethargy. You need active lifestyle and stimulating activities."
    };

    return {
        title: "Nadi (Health Constitution)",
        value: nadi,
        meaning: meanings[nadi]
    };
}

function getGrahaInfo(lord, role) {
    const meanings = {
        "Sun": role === 'groom' ?
            "Your ruling planet Sun makes you naturally authoritative and confident. You have leadership qualities and strong willpower. In marriage, you'll be the guiding light for your family." :
            "Sun as your ruling planet gives you confidence and vitality. You have a strong personality and natural leadership. You're attracted to partners who respect your strength and independence.",
        "Moon": role === 'groom' ?
            "Your ruling planet Moon makes you emotional and intuitive. You're caring, nurturing, and sensitive to others' feelings. You'll be an emotionally supportive and understanding husband." :
            "Moon as your ruling planet makes you naturally nurturing and intuitive. You're emotionally sensitive and caring. You're attracted to partners who appreciate your emotional depth and caring nature.",
        "Mars": role === 'groom' ?
            "Your ruling planet Mars gives you energy, courage, and determination. You're action-oriented and can handle challenges well. You'll be a protective and dynamic partner in marriage." :
            "Mars as your ruling planet gives you energy and courage. You're independent and can handle challenges. You're attracted to partners who appreciate your strength and can match your energy level.",
        "Mercury": role === 'groom' ?
            "Your ruling planet Mercury makes you intelligent and communicative. You're good with words, adaptable, and love learning. You'll bring intellectual stimulation to your marriage." :
            "Mercury as your ruling planet makes you intelligent and communicative. You love learning and sharing ideas. You're attracted to partners who can engage in meaningful conversations and intellectual activities.",
        "Jupiter": role === 'groom' ?
            "Your ruling planet Jupiter gives you wisdom and spiritual inclination. You're generous, optimistic, and have good judgment. You'll be a wise guide and teacher in your marriage." :
            "Jupiter as your ruling planet gives you wisdom and optimism. You're naturally generous and have good judgment. You're attracted to partners who share your values and spiritual inclinations.",
        "Venus": role === 'groom' ?
            "Your ruling planet Venus makes you loving and artistic. You appreciate beauty, comfort, and harmony. You'll create a beautiful, harmonious environment in your marriage." :
            "Venus as your ruling planet makes you naturally loving and artistic. You appreciate beauty and harmony. You're attracted to partners who share your aesthetic sense and love for beautiful things.",
        "Saturn": role === 'groom' ?
            "Your ruling planet Saturn makes you disciplined and responsible. You're hardworking, practical, and build things slowly but surely. You'll be a reliable, steady partner in marriage." :
            "Saturn as your ruling planet makes you disciplined and responsible. You're practical and hardworking. You're attracted to partners who appreciate your reliability and share your long-term vision.",
        "Rahu": role === 'groom' ?
            "Your ruling planet Rahu makes you ambitious and unconventional. You think outside the box and aren't afraid of change. You'll bring innovation and excitement to your marriage." :
            "Rahu as your ruling planet makes you ambitious and unconventional. You're not afraid of change and like to explore new things. You're attracted to partners who appreciate your unique perspective.",
        "Ketu": role === 'groom' ?
            "Your ruling planet Ketu gives you spiritual insight and detachment. You're wise beyond your years and can see the deeper meaning in life. You'll bring spiritual depth to your marriage." :
            "Ketu as your ruling planet gives you spiritual wisdom and intuition. You have deep insights and prefer meaningful connections. You're attracted to partners who appreciate your spiritual nature."
    };

    return {
        title: "Graha (Ruling Planet)",
        value: lord,
        meaning: meanings[lord] || "Your ruling planet influences your personality and approach to relationships."
    };
}

function getNakshatraInfo(nakshatra, role) {
    const nakshatraDetails = {
        "Ashwini": role === 'groom' ?
            "Born under Ashwini, you're a natural healer and pioneer. You have the energy to start new things and help others. In marriage, you'll be the one who initiates positive changes and brings healing energy." :
            "Ashwini nakshatra gives you healing abilities and pioneering spirit. You're quick to help others and start new ventures. You're attracted to partners who appreciate your caring nature and dynamic energy.",
        "Bharani": role === 'groom' ?
            "Bharani makes you responsible and nurturing. You can handle life's challenges with maturity and take care of others naturally. You'll be a protective and responsible family head." :
            "Born under Bharani, you're naturally nurturing and responsible. You can handle difficulties with grace and take care of others. You're attracted to partners who value your strength and caring nature.",
        // Add more nakshatras as needed...
    };

    return {
        title: "Nakshatra (Birth Star)",
        value: nakshatra.name,
        meaning: nakshatraDetails[nakshatra.name] || `Born under ${nakshatra.name} nakshatra, you have unique qualities that influence your personality and relationships. This star shapes your natural tendencies and compatibility with others.`
    };
}

function getRashiInfo(rashi, role) {
    const rashiMeanings = {
        "Aries": role === 'groom' ?
            "As an Aries, you're naturally leadership-oriented and energetic. You like to take charge and are always ready for action. In marriage, you'll be the initiator and motivator." :
            "Aries makes you independent and energetic. You like to lead and aren't afraid of challenges. You're attracted to partners who can match your energy and respect your independence.",
        "Taurus": role === 'groom' ?
            "Taurus makes you stable and practical. You value security and comfort, and you're very reliable. You'll provide material security and emotional stability in marriage." :
            "As a Taurus, you value stability and comfort. You're practical and reliable, preferring steady relationships. You're attracted to partners who can provide security and appreciate your loyalty.",
        "Gemini": role === 'groom' ?
            "Gemini gives you versatility and communication skills. You're intellectually curious and adaptable. You'll bring variety and intellectual stimulation to your marriage." :
            "Gemini makes you communicative and adaptable. You love learning and sharing ideas. You're attracted to partners who can engage in interesting conversations and appreciate your versatility.",
        "Cancer": role === 'groom' ?
            "Cancer makes you emotionally sensitive and nurturing. You're naturally caring and protective of your family. You'll create a warm, loving home environment." :
            "As a Cancer, you're naturally nurturing and emotionally intuitive. You value family and home. You're attracted to partners who appreciate your caring nature and want to build a loving family.",
        "Leo": role === 'groom' ?
            "Leo gives you confidence and natural leadership. You have a generous heart and like to be appreciated. You'll be a proud and protective family head who leads with warmth." :
            "Leo makes you confident and generous. You like to be appreciated and have a warm heart. You're attracted to partners who admire your strength and can share in your generous nature.",
        "Virgo": role === 'groom' ?
            "Virgo makes you practical and detail-oriented. You're helpful and like to serve others. You'll be the one who takes care of practical matters and helps solve problems in marriage." :
            "As a Virgo, you're practical and helpful. You pay attention to details and like to serve others. You're attracted to partners who appreciate your helpful nature and practical approach to life.",
        "Libra": role === 'groom' ?
            "Libra gives you a love for harmony and beauty. You're diplomatic and fair-minded. You'll work to maintain balance and peace in your marriage, always seeking harmony." :
            "Libra makes you naturally diplomatic and peace-loving. You appreciate beauty and harmony. You're attracted to partners who share your aesthetic sense and desire for balanced relationships.",
        "Scorpio": role === 'groom' ?
            "Scorpio makes you intense and passionate. You're deeply emotional and fiercely loyal. Once committed, you'll be completely devoted and protective of your family." :
            "As a Scorpio, you're intense and passionate. You feel emotions deeply and are fiercely loyal. You're attracted to partners who can handle your intensity and appreciate your depth.",
        "Sagittarius": role === 'groom' ?
            "Sagittarius gives you a love for freedom and adventure. You're optimistic and philosophical. You'll bring wisdom and a sense of adventure to your marriage." :
            "Sagittarius makes you freedom-loving and optimistic. You enjoy learning and exploring. You're attracted to partners who share your love for adventure and philosophical discussions.",
        "Capricorn": role === 'groom' ?
            "Capricorn makes you ambitious and disciplined. You're practical and work hard for long-term goals. You'll be a responsible provider who builds lasting security for your family." :
            "As a Capricorn, you're ambitious and disciplined. You work hard for your goals and value achievement. You're attracted to partners who appreciate your dedication and share your long-term vision.",
        "Aquarius": role === 'groom' ?
            "Aquarius gives you humanitarian instincts and original thinking. You're independent and innovative. You'll bring unique perspectives and social consciousness to your marriage." :
            "Aquarius makes you independent and innovative. You think differently and care about social causes. You're attracted to partners who appreciate your uniqueness and share your ideals.",
        "Pisces": role === 'groom' ?
            "Pisces makes you compassionate and intuitive. You're artistic and spiritually inclined. You'll bring emotional depth and spiritual understanding to your marriage." :
            "As a Pisces, you're naturally compassionate and intuitive. You're artistic and spiritually minded. You're attracted to partners who appreciate your sensitivity and share your spiritual interests."
    };

    return {
        title: "Rashi (Moon Sign)",
        value: rashi,
        meaning: rashiMeanings[rashi] || `Your moon sign ${rashi} influences your emotional nature and how you express feelings in relationships.`
    };
}

// Toggle detailed Guna information
function toggleGunaDetails(gunaKey) {
    // Expand all guna details and set all icons to '▲'
    const allDetails = document.querySelectorAll('.guna-detailed-info');
    const allIcons = document.querySelectorAll('.expand-icon');
    allDetails.forEach(div => { div.style.display = 'block'; });
    allIcons.forEach(icon => { icon.textContent = '▲'; });
}

// Get detailed information for each Guna
function getDetailedGunaInfo(gunaKey, result, groomPos, bridePos) {
    const detailedInfo = {
        varna: {
            title: "Spiritual & Social Compatibility",
            explanation: "Varna Koot represents the spiritual and social compatibility between partners based on the ancient Varna system.",
            significance: result.compatible ?
                "This positive Varna match indicates good social harmony and mutual respect." :
                "The Varna mismatch suggests potential challenges in social acceptance or spiritual compatibility.",
            scoring: "Awards 1 point when groom's Varna is equal or higher than bride's."
        },
        vashya: {
            title: "Mutual Attraction & Control",
            explanation: "Vashya Koot determines the level of mutual attraction, influence, and control between partners based on natural behavioral patterns.",
            significance: result.compatible ?
                "This excellent Vashya match indicates strong mutual attraction and natural understanding." :
                "The Vashya mismatch suggests different approaches to life and relationships.",
            scoring: "Awards 2 points for same groups, 1 point for compatible groups, 0 for incompatible."
        },
        tara: {
            title: "Fortune & Prosperity",
            explanation: "Tara Koot analyzes birth star compatibility and its influence on the couple's fortune and well-being through the 9 Tara system.",
            significance: result.compatible ?
                "This favorable Tara indicates good fortune and positive outcomes for your relationship." :
                "This challenging Tara suggests potential obstacles that can be overcome with proper remedies.",
            scoring: "Awards 3 points for highly favorable Taras, 1 point for moderate, 0 for inauspicious."
        },
        yoni: {
            title: "Physical & Sexual Compatibility",
            explanation: "Yoni Koot represents the sexual and physical compatibility between partners based on animal symbols representing intimate nature.",
            significance: result.compatible ?
                "This excellent Yoni match indicates strong physical attraction and sexual compatibility." :
                "The Yoni mismatch suggests potential challenges in physical intimacy that require patience and understanding.",
            scoring: "Awards 4 points for same/compatible animals, decreasing for neutral to enemy combinations."
        },
        graha_maitri: {
            title: "Mental & Intellectual Compatibility",
            explanation: "Graha Maitri analyzes the friendship between ruling planets of birth stars, determining mental compatibility and thought processes.",
            significance: result.compatible ?
                "This positive match indicates excellent mental compatibility and effective communication." :
                "The challenging planetary relationship may require extra effort in communication and patience.",
            scoring: "Awards 5 points for same planets, 4 for friendly, 3 for neutral, 0 for enemy planets."
        },
        gana: {
            title: "Temperament & Behavior",
            explanation: "Gana Koot represents temperamental compatibility through three personality types: Deva (divine), Manushya (human), and Rakshasa (demonic).",
            significance: result.compatible ?
                "Compatible temperaments that will lead to harmonious daily interactions and shared values." :
                "The Gana mismatch indicates very different temperaments that may lead to conflicts in daily life.",
            scoring: "Awards 6 points for same Gana, 5 for Deva-Manushya, 0 for Deva-Rakshasa (highly incompatible)."
        },
        bhakoot: {
            title: "Family Welfare & Prosperity",
            explanation: "Bhakoot Koot analyzes Moon sign compatibility and its impact on prosperity, family welfare, and overall happiness.",
            significance: result.compatible ?
                "This positive match supports family prosperity, good health, and overall happiness." :
                "The Bhakoot dosha indicates potential challenges in family life, health, or prosperity requiring remedies.",
            scoring: "Awards 7 points for compatible Rashi combinations, 0 when doshas are present."
        },
        nadi: {
            title: "Health & Progeny (Most Important)",
            explanation: "Nadi Koot is the most critical factor, representing health, genetic compatibility, and progeny prospects through three constitutional types.",
            significance: result.compatible ?
                "Excellent health compatibility and genetic diversity ensuring healthy progeny and balanced constitution." :
                "Nadi Dosha is the most serious incompatibility, potentially affecting health, genetics, and children.",
            scoring: "Awards 8 points (highest) for different Nadis, 0 for same Nadi (most critical dosha)."
        }
    };

    const info = detailedInfo[gunaKey];
    if (!info) return '<p>Detailed information not available.</p>';

    return '<div class="detailed-content">' +
        '<h5 style="color: #333; margin-bottom: 10px;">📚 ' + info.title + '</h5>' +
        '<p style="margin-bottom: 15px; line-height: 1.6;">' + info.explanation + '</p>' +

        '<h5 style="color: #333; margin-bottom: 10px;">🔍 Analysis for This Match</h5>' +
        '<p style="margin-bottom: 15px; line-height: 1.6;">' + info.significance + '</p>' +

        '<h5 style="color: #333; margin-bottom: 10px;">📊 Scoring System</h5>' +
        '<p style="margin-bottom: 15px; line-height: 1.6;">' + info.scoring + '</p>' +
        '</div>';
}

// Tutorial functionality
function toggleTutorial() {
    const tutorialContent = document.getElementById('tutorial-content');
    const tutorialIcon = document.getElementById('tutorial-icon');

    if (!tutorialContent || !tutorialIcon) {
        return;
    }

    // Check the actual visibility by looking at the icon text
    const isCurrentlyHidden = tutorialIcon.textContent.includes('Show Tutorial');

    if (isCurrentlyHidden) {
        // Show the tutorial
        tutorialContent.style.display = 'block';
        tutorialContent.style.opacity = '1';
        tutorialContent.style.maxHeight = 'none';
        tutorialContent.style.visibility = 'visible';
        tutorialIcon.textContent = '📚 Hide Tutorial';

        setTimeout(() => {
            tutorialContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    } else {
        // Hide the tutorial
        tutorialContent.style.display = 'none';
        tutorialIcon.textContent = '📖 Show Tutorial';
    }
}

function scrollToForms() {
    document.querySelector('.form-container').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    // Hide tutorial after scrolling
    const tutorialContent = document.getElementById('tutorial-content');
    const tutorialIcon = document.getElementById('tutorial-icon');
    if (tutorialContent && tutorialIcon) {
        tutorialContent.style.display = 'none';
        tutorialIcon.textContent = '📖 Show Tutorial';
    }
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function () {
    // Initialize theme
    initializeTheme();

    // Add date validation
    const today = new Date().toISOString().split('T')[0];
    const groomDob = document.getElementById('groomDob');
    const brideDob = document.getElementById('brideDob');

    if (groomDob) groomDob.setAttribute('max', today);
    if (brideDob) brideDob.setAttribute('max', today);

    // Add form validation styling
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#28a745';
            }
        });
    });
});

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        // Switch to light mode
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark mode
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');

    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Light Mode';
    } else {
        body.removeAttribute('data-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Dark Mode';
    }
}

// PDF Generation Function
function downloadPDF() {
    const resultsContainer = document.getElementById('results');
    if (!resultsContainer) {
        alert('No results to download. Please generate compatibility results first.');
        return;
    }

    // Show loading message
    const downloadBtn = document.getElementById('downloadPdfBtn');
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = '🔄 Generating PDF...';
    downloadBtn.disabled = true;

    // Expand all guna cards/tiles before generating the PDF
    const allDetails = document.querySelectorAll('.guna-detailed-info');
    const allIcons = document.querySelectorAll('.expand-icon');
    allDetails.forEach(div => { div.style.display = 'block'; });
    allIcons.forEach(icon => { icon.textContent = '▲'; });

    // Immediately generate the PDF after expanding tiles (no delay)
    // Create a temporary container for PDF content
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.top = '0';
    pdfContainer.style.width = '800px';
    pdfContainer.style.backgroundColor = 'white';
    pdfContainer.style.color = 'black';
    pdfContainer.style.padding = '40px';
    pdfContainer.style.fontFamily = 'Arial, sans-serif';
    pdfContainer.style.fontSize = '12px';
    pdfContainer.style.lineHeight = '1.4';

    // Clone the results content
    const resultsClone = resultsContainer.cloneNode(true);

    // Remove the download button from the clone
    const downloadBtnClone = resultsClone.querySelector('#downloadPdfBtn');
    if (downloadBtnClone) {
        downloadBtnClone.remove();
    }

    // Add header information
    const header = document.createElement('div');
    header.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px;">
            <h1 style="color: #333; margin: 0; font-size: 24px;">Kundli Matching Report</h1>
            <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">Vedic Astrology Compatibility Analysis</p>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
    `;
    pdfContainer.appendChild(header);

    // Add the results content
    pdfContainer.appendChild(resultsClone);

    // Add footer
    const footer = document.createElement('div');
    footer.innerHTML = `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: center; font-size: 10px; color: #666;">
            <p>This report is generated using traditional Vedic astrology principles.</p>
            <p>For detailed consultation and remedies, please consult with a qualified astrologer.</p>
            <p>© ${new Date().getFullYear()} Kundli Matching Tool</p>
        </div>
    `;
    pdfContainer.appendChild(footer);

    // Add to document temporarily
    document.body.appendChild(pdfContainer);

    // Generate PDF using html2canvas and jsPDF
    html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
    }).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        // Use the correct jsPDF reference for UMD build
        const jsPDFConstructor = window.jspdf ? window.jspdf.jsPDF : window.jsPDF;
        const pdf = new jsPDFConstructor('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Generate filename
        const groomName = document.getElementById('groomName')?.value || 'Groom';
        const brideName = document.getElementById('brideName')?.value || 'Bride';
        const filename = `Kundli_Matching_${groomName}_${brideName}_${new Date().toISOString().split('T')[0]}.pdf`;

        // Download the PDF
        pdf.save(filename);

        // Clean up
        document.body.removeChild(pdfContainer);

        // Restore button
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    }).catch(error => {
        console.error('PDF generation failed:', error);
        alert('PDF generation failed. Please try again.');

        // Clean up
        document.body.removeChild(pdfContainer);

        // Restore button
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    });
}

// Make functions globally available
window.performMatching = performMatching;
window.toggleTutorial = toggleTutorial;
window.scrollToForms = scrollToForms;
window.toggleGunaDetails = toggleGunaDetails;
window.toggleTheme = toggleTheme;
window.downloadPDF = downloadPDF;