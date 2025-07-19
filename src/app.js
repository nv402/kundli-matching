// Main application logic
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

        console.log("Form data collected:", { groomData, brideData });

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
        console.log("Moon positions:", { groomPosition, bridePosition });

        // Perform Guna matching
        console.log("Performing guna matching...");
        const matchingResults = kundliEngine.calculateGunaMatching(groomPosition, bridePosition);
        console.log("Matching results:", matchingResults);

        // Display results
        console.log("Displaying results...");
        displayResults(matchingResults, groomData, brideData, groomPosition, bridePosition);

    } catch (error) {
        console.error("Error in performMatching:", error);
        alert("An error occurred while matching kundli: " + error.message);

        // Show a basic error message in results
        const resultsContainer = document.getElementById('results');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = '<div style="color: red; padding: 20px; text-align: center;">' +
                '<h3>Error occurred while matching</h3>' +
                '<p>' + error.message + '</p>' +
                '<p>Please check the console for more details.</p>' +
                '</div>';
        }
    }
}

function validateInputs(groom, bride) {
    return groom.name && groom.dob && groom.tob && groom.place &&
        bride.name && bride.dob && bride.tob && bride.place;
}

function displayResults(results, groomData, brideData, groomPos, bridePos) {
    console.log("displayResults function called with:", { results, groomData, brideData });

    const resultsContainer = document.getElementById('results');
    console.log("Results container found:", resultsContainer);
    const scoreDisplay = document.getElementById('gunaScore');
    const detailedResults = document.getElementById('detailedResults');
    const recommendations = document.getElementById('recommendations');

    // Show results container
    resultsContainer.style.display = 'block';

    // Display overall score
    const percentage = Math.round((results.totalScore / results.maxScore) * 100);
    scoreDisplay.innerHTML = `
        <div class="score-circle" style="--score-deg: ${percentage * 3.6}deg;">
            <div class="score-inner">
                <div style="font-size: 2em; font-weight: bold; color: #333;">${results.totalScore}/36</div>
                <div style="color: #666;">Guna Score</div>
                <div class="compatibility-${results.compatibility.class}" style="font-weight: bold; margin-top: 5px;">
                    ${results.compatibility.level}
                </div>
            </div>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <h3>${groomData.name} & ${brideData.name}</h3>
            <p>Compatibility: ${percentage}%</p>
        </div>
    `;

    // Display detailed Guna results with expandable details
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

    detailedResults.innerHTML = Object.entries(results.results).map(([key, result]) => {
        const detailedInfo = getDetailedGunaInfo(key, result, groomPos, bridePos);
        return `
            <div class="guna-card" onclick="toggleGunaDetails('${key}')">
                <div class="guna-header">
                    <div class="guna-title-section">
                        <h4>${gunaNames[key]}</h4>
                        <span class="expand-icon" id="icon-${key}">▼</span>
                    </div>
                    <span class="guna-score ${result.compatible ? 'compatibility-excellent' : 'compatibility-poor'}">
                        ${result.score}/${result.maxScore}
                    </span>
                </div>
                <p class="guna-basic-desc">${result.description}</p>
                <div style="margin-top: 10px;">
                    <span class="compatibility-status ${result.compatible ? 'compatibility-excellent' : 'compatibility-poor'}">
                        ${result.compatible ? '✓ Compatible' : '✗ Needs Attention'}
                    </span>
                </div>
                
                <div class="guna-detailed-info" id="details-${key}" style="display: none;">
                    <div class="detailed-content">
                        <h5>📚 About ${gunaNames[key]}</h5>
                        <p class="guna-explanation">${detailedInfo.explanation}</p>
                        
                        <h5>🔍 Analysis for This Match</h5>
                        <div class="analysis-details">
                            ${detailedInfo.analysis}
                        </div>
                        
                        <h5>💡 Significance</h5>
                        <p class="significance">${detailedInfo.significance}</p>
                        
                        ${detailedInfo.remedies ? `
                            <h5>🔧 Remedies & Suggestions</h5>
                            <div class="remedies">
                                ${detailedInfo.remedies}
                            </div>
                        ` : ''}
                        
                        <div class="scoring-info">
                            <h5>📊 Scoring System</h5>
                            <p>${detailedInfo.scoring}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Display birth details
    const birthDetails = `
        <div class="birth-details" style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3>Birth Details</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
                <div>
                    <h4>${groomData.name} (Groom)</h4>
                    <p>Nakshatra: ${kundliEngine.nakshatras[groomPos.nakshatra].name}</p>
                    <p>Rashi: ${kundliEngine.rashis[groomPos.rashi]}</p>
                    <p>Birth Date: ${groomData.dob}</p>
                    <p>Birth Time: ${groomData.tob}</p>
                </div>
                <div>
                    <h4>${brideData.name} (Bride)</h4>
                    <p>Nakshatra: ${kundliEngine.nakshatras[bridePos.nakshatra].name}</p>
                    <p>Rashi: ${kundliEngine.rashis[bridePos.rashi]}</p>
                    <p>Birth Date: ${brideData.dob}</p>
                    <p>Birth Time: ${brideData.tob}</p>
                </div>
            </div>
        </div>
    `;

    // Generate and display recommendations
    const recommendationsList = kundliEngine.generateRecommendations(results);
    recommendations.innerHTML = `
        ${birthDetails}
        <h3>Recommendations</h3>
        <ul style="margin-top: 15px; line-height: 1.8;">
            ${recommendationsList.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
        <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 5px; border-left: 4px solid #2196f3;">
            <strong>Note:</strong> This analysis is based on traditional Vedic astrology principles. 
            For detailed consultation and remedies, please consult with a qualified astrologer.
        </div>
    `;

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
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
    tutorialContent.style.display = 'none';
    tutorialIcon.textContent = '📖 Show Tutorial';
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function () {
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

    // Add tutorial interaction hints
    const tutorialCards = document.querySelectorAll('.guna-guide-card, .tip-card, .dosha-card');
    tutorialCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
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
            explanation: "Varna Koot represents the spiritual and social compatibility between partners. It's based on the ancient Varna system which categorizes people based on their spiritual evolution and social roles. This factor ensures that both partners can support each other's spiritual growth.",
            analysis: `
                <p><strong>Groom's Varna:</strong> ${result.description.split(', ')[0].split(': ')[1]} - Represents his spiritual and social nature</p>
                <p><strong>Bride's Varna:</strong> ${result.description.split(', ')[1].split(': ')[1]} - Represents her spiritual and social nature</p>
                <p><strong>Compatibility Rule:</strong> The groom's Varna should be equal or higher than the bride's for traditional harmony</p>
                <p><strong>Result:</strong> ${result.compatible ? 'The Varna combination supports mutual respect and spiritual growth' : 'This combination may create social or spiritual imbalances'}</p>
            `,
            significance: result.compatible ?
                "This positive Varna match indicates good social harmony and mutual respect. Both partners will likely support each other's personal and spiritual development." :
                "The Varna mismatch suggests potential challenges in social acceptance or spiritual compatibility. However, with mutual understanding and respect, these differences can be overcome.",
            remedies: !result.compatible ? `
                <ul>
                    <li>Focus on mutual respect and understanding of each other's backgrounds</li>
                    <li>Engage in spiritual practices together to enhance compatibility</li>
                    <li>Seek blessings from elders and spiritual guides</li>
                    <li>Practice tolerance and acceptance of social differences</li>
                </ul>
            ` : null,
            scoring: "Varna Koot awards 1 point when the groom's Varna is equal or higher than the bride's. The hierarchy is: Brahmin > Kshatriya > Vaishya > Shudra."
        },

        vashya: {
            explanation: "Vashya Koot determines the level of mutual attraction, influence, and control between partners. It's based on the natural behavioral patterns and instincts represented by different animal groups. This factor indicates who will have more influence in the relationship.",
            analysis: `
                <p><strong>Groom's Group:</strong> ${result.description.split(', ')[0].split(': ')[1]} - His natural behavioral pattern</p>
                <p><strong>Bride's Group:</strong> ${result.description.split(', ')[1].split(': ')[1]} - Her natural behavioral pattern</p>
                <p><strong>Groups Explained:</strong></p>
                <ul>
                    <li><strong>Chatushpad (Four-legged):</strong> Stable, grounded, practical nature</li>
                    <li><strong>Manav (Human):</strong> Balanced, social, adaptable nature</li>
                    <li><strong>Jalachhar (Water creatures):</strong> Emotional, intuitive, flowing nature</li>
                    <li><strong>Keet (Insects):</strong> Active, restless, dynamic nature</li>
                </ul>
                <p><strong>Compatibility:</strong> ${result.compatible ? 'Same groups ensure natural understanding and mutual attraction' : 'Different groups may lead to conflicting approaches to life'}</p>
            `,
            significance: result.compatible ?
                "This excellent Vashya match indicates strong mutual attraction and natural understanding. Both partners will instinctively know how to please and influence each other positively." :
                "The Vashya mismatch suggests different approaches to life and relationships. One partner may feel dominated or misunderstood by the other's natural behavior patterns.",
            remedies: !result.compatible ? `
                <ul>
                    <li>Learn to appreciate each other's different approaches to life</li>
                    <li>Practice patience and avoid trying to control each other</li>
                    <li>Focus on finding common ground and shared interests</li>
                    <li>Communicate openly about your natural tendencies and needs</li>
                    <li>Seek counseling to understand behavioral differences</li>
                </ul>
            ` : null,
            scoring: "Vashya Koot awards 2 points for same groups, 1 point for compatible groups (like Manav-Chatushpad), and 0 points for incompatible combinations."
        },

        tara: {
            explanation: "Tara Koot analyzes the birth star compatibility and its influence on the couple's fortune, prosperity, and overall well-being. It's based on the 9 Tara system, where each Tara represents different aspects of life and fortune.",
            analysis: `
                <p><strong>Tara Classification:</strong> ${result.description}</p>
                <p><strong>The 9 Taras and their meanings:</strong></p>
                <ul>
                    <li><strong>Janma (1st):</strong> Birth star - Excellent for longevity and health</li>
                    <li><strong>Sampat (2nd):</strong> Wealth star - Good for prosperity and material gains</li>
                    <li><strong>Vipat (3rd):</strong> Danger star - May bring obstacles and challenges</li>
                    <li><strong>Kshema (4th):</strong> Welfare star - Excellent for happiness and well-being</li>
                    <li><strong>Pratyak (5th):</strong> Obstacle star - May create hindrances</li>
                    <li><strong>Sadhana (6th):</strong> Achievement star - Moderate, requires effort</li>
                    <li><strong>Vadha (7th):</strong> Destruction star - Most inauspicious, avoid if possible</li>
                    <li><strong>Mitra (8th):</strong> Friend star - Excellent for friendship and harmony</li>
                    <li><strong>Param Mitra (9th):</strong> Best friend star - Very good for mutual support</li>
                </ul>
                <p><strong>Your Tara Result:</strong> ${result.compatible ? 'This is a favorable Tara that supports your relationship' : 'This Tara may bring challenges that need careful attention'}</p>
            `,
            significance: result.compatible ?
                "This favorable Tara indicates good fortune, prosperity, and positive outcomes for your relationship. The stars support your union and bless it with happiness." :
                "This challenging Tara suggests potential obstacles or difficulties. However, with proper remedies and mutual understanding, these challenges can be overcome.",
            remedies: !result.compatible ? `
                <ul>
                    <li>Perform regular prayers and spiritual practices together</li>
                    <li>Seek blessings from family deities and spiritual guides</li>
                    <li>Consider performing specific pujas for Tara dosha mitigation</li>
                    <li>Maintain positive attitude and support each other through difficulties</li>
                    <li>Consult with experienced astrologers for specific remedial measures</li>
                </ul>
            ` : null,
            scoring: "Tara Koot awards 3 points for highly favorable Taras (Janma, Kshema, Mitra), 1 point for moderately favorable ones, and 0 points for inauspicious Taras."
        },

        yoni: {
            explanation: "Yoni Koot represents the sexual and physical compatibility between partners. Each Nakshatra is associated with a specific animal (Yoni) that represents the sexual nature, physical attraction, and intimate compatibility of the person.",
            analysis: `
                <p><strong>Groom's Yoni:</strong> ${result.description.split(', ')[0].split(': ')[1]} - Represents his physical and sexual nature</p>
                <p><strong>Bride's Yoni:</strong> ${result.description.split(', ')[1].split(': ')[1]} - Represents her physical and sexual nature</p>
                <p><strong>Yoni Compatibility Analysis:</strong></p>
                <div class="yoni-analysis">
                    ${getYoniCompatibilityDetails(result.description.split(', ')[0].split(': ')[1], result.description.split(', ')[1].split(': ')[1], result.score)}
                </div>
                <p><strong>Physical Harmony:</strong> ${result.compatible ? 'Excellent physical and sexual compatibility expected' : 'May face challenges in physical intimacy and attraction'}</p>
            `,
            significance: result.compatible ?
                "This excellent Yoni match indicates strong physical attraction, sexual compatibility, and intimate harmony. The couple will likely have a satisfying physical relationship." :
                "The Yoni mismatch suggests potential challenges in physical intimacy or sexual compatibility. This may require patience, understanding, and open communication.",
            remedies: !result.compatible ? `
                <ul>
                    <li>Focus on emotional bonding and communication to enhance physical connection</li>
                    <li>Practice patience and understanding in intimate matters</li>
                    <li>Seek counseling if needed to address compatibility issues</li>
                    <li>Perform Venus-related remedies to enhance love and attraction</li>
                    <li>Create a harmonious and romantic environment at home</li>
                </ul>
            ` : null,
            scoring: "Yoni Koot awards 4 points for same or highly compatible animals, 3 points for friendly animals, 2 points for neutral, 1 point for somewhat incompatible, and 0 points for enemy animals."
        },

        graha_maitri: {
            explanation: "Graha Maitri Koot analyzes the friendship between the ruling planets of both partners' birth stars. This determines mental compatibility, intellectual harmony, and the ability to understand each other's thought processes.",
            analysis: `
                <p><strong>Groom's Nakshatra Lord:</strong> ${result.description.split(', ')[0].split(': ')[1]} - Rules his mental nature and thinking patterns</p>
                <p><strong>Bride's Nakshatra Lord:</strong> ${result.description.split(', ')[1].split(': ')[1]} - Rules her mental nature and thinking patterns</p>
                <p><strong>Planetary Relationship:</strong> ${getPlanetaryRelationship(result.description.split(', ')[0].split(': ')[1], result.description.split(', ')[1].split(': ')[1])}</p>
                <p><strong>Mental Compatibility:</strong> ${result.compatible ? 'Excellent mental harmony and intellectual understanding' : 'May face challenges in mental compatibility and communication'}</p>
            `,
            significance: result.compatible ?
                "This positive Graha Maitri indicates excellent mental compatibility. Both partners will understand each other's thinking patterns and communicate effectively." :
                "The challenging Graha Maitri suggests potential misunderstandings or different thought processes. This may require extra effort in communication and patience.",
            remedies: !result.compatible ? `
                <ul>
                    <li>Practice active listening and patient communication</li>
                    <li>Respect each other's different perspectives and opinions</li>
                    <li>Engage in intellectual activities together to build understanding</li>
                    <li>Perform remedies for the conflicting planets (mantras, gemstones)</li>
                    <li>Seek to find common interests and shared goals</li>
                </ul>
            ` : null,
            scoring: "Graha Maitri awards 5 points for same planets, 4 points for friendly planets, 3 points for neutral planets, and 0 points for enemy planets."
        },

        gana: {
            explanation: "Gana Koot represents the temperamental and behavioral compatibility between partners. The three Ganas represent different personality types and approaches to life, determining how well the couple will get along in daily life.",
            analysis: `
                <p><strong>Groom's Gana:</strong> ${result.description.split(', ')[0].split(': ')[1]}</p>
                <p><strong>Bride's Gana:</strong> ${result.description.split(', ')[1].split(': ')[1]}</p>
                <p><strong>Gana Characteristics:</strong></p>
                <ul>
                    <li><strong>Deva Gana:</strong> Divine nature - Kind, generous, spiritual, peace-loving</li>
                    <li><strong>Manushya Gana:</strong> Human nature - Balanced, practical, social, adaptable</li>
                    <li><strong>Rakshasa Gana:</strong> Demonic nature - Aggressive, ambitious, materialistic, strong-willed</li>
                </ul>
                <p><strong>Temperamental Harmony:</strong> ${result.compatible ? 'Compatible temperaments that complement each other well' : 'Conflicting temperaments that may cause personality clashes'}</p>
            `,
            significance: result.compatible ?
                "This positive Gana match indicates compatible temperaments and similar approaches to life. The couple will likely have harmonious daily interactions and shared values." :
                "The Gana mismatch, especially Deva-Rakshasa combination, suggests very different temperaments that may lead to conflicts and misunderstandings in daily life.",
            remedies: !result.compatible ? `
                <ul>
                    <li>Practice tolerance and acceptance of each other's different natures</li>
                    <li>Focus on finding balance between different approaches to life</li>
                    <li>Avoid trying to change each other's fundamental nature</li>
                    <li>Seek counseling to understand and manage temperamental differences</li>
                    <li>Perform specific pujas to reduce Gana dosha effects</li>
                    <li>Cultivate patience and compromise in daily interactions</li>
                </ul>
            ` : null,
            scoring: "Gana Koot awards 6 points for same Gana, 5 points for Deva-Manushya combination, and 0 points for Deva-Rakshasa (considered highly incompatible)."
        },

        bhakoot: {
            explanation: "Bhakoot Koot analyzes the Moon sign (Rashi) compatibility and its impact on prosperity, family welfare, and overall happiness. Certain Rashi combinations create doshas that can affect the couple's well-being and family life.",
            analysis: `
                <p><strong>Groom's Rashi:</strong> ${result.description.split(', ')[0].split(': ')[1]}</p>
                <p><strong>Bride's Rashi:</strong> ${result.description.split(', ')[1].split(': ')[1]}</p>
                ${result.dosha ? `<p><strong>Dosha Detected:</strong> ${result.dosha}</p>` : ''}
                <p><strong>Bhakoot Analysis:</strong></p>
                <ul>
                    <li><strong>Dwirdwadash Dosha:</strong> 2nd and 12th position - May affect wealth and family harmony</li>
                    <li><strong>Shashtashtam Dosha:</strong> 6th and 8th position - May bring health issues and obstacles</li>
                </ul>
                <p><strong>Family Prosperity:</strong> ${result.compatible ? 'Supports family prosperity and happiness' : 'May create challenges in family life and prosperity'}</p>
            `,
            significance: result.compatible ?
                "This positive Bhakoot match supports family prosperity, good health, and overall happiness. The Rashi combination is favorable for a harmonious married life." :
                "The Bhakoot dosha indicates potential challenges in family life, health, or prosperity. This is considered a significant factor that requires attention and remedies.",
            remedies: !result.compatible ? `
                <ul>
                    <li>Perform specific pujas and homas to mitigate Bhakoot dosha</li>
                    <li>Seek blessings from family deities and spiritual guides</li>
                    <li>Consider wearing protective gemstones as recommended by astrologers</li>
                    <li>Maintain regular spiritual practices and charity</li>
                    <li>Consult experienced astrologers for personalized remedial measures</li>
                    <li>Focus on building strong family bonds and mutual support</li>
                </ul>
            ` : null,
            scoring: "Bhakoot Koot awards 7 points for compatible Rashi combinations and 0 points when Dwirdwadash or Shashtashtam dosha is present."
        },

        nadi: {
            explanation: "Nadi Koot is the most important factor, representing the health, genetic compatibility, and progeny prospects of the couple. It's based on the three Nadis (energy channels) that govern different aspects of health and constitution.",
            analysis: `
                <p><strong>Groom's Nadi:</strong> ${result.description.split(', ')[0].split(': ')[1]} - His constitutional and health type</p>
                <p><strong>Bride's Nadi:</strong> ${result.description.split(', ')[1].split(': ')[1]} - Her constitutional and health type</p>
                <p><strong>Nadi Characteristics:</strong></p>
                <ul>
                    <li><strong>Vata Nadi:</strong> Air element - Active, nervous system, movement</li>
                    <li><strong>Pitta Nadi:</strong> Fire element - Metabolism, digestion, energy</li>
                    <li><strong>Kapha Nadi:</strong> Water/Earth element - Structure, immunity, stability</li>
                </ul>
                <p><strong>Health Compatibility:</strong> ${result.compatible ? 'Excellent health compatibility and genetic diversity' : 'Same Nadi creates Nadi Dosha - most serious incompatibility'}</p>
            `,
            significance: result.compatible ?
                "This excellent Nadi match ensures good health compatibility, genetic diversity, and healthy progeny. Different Nadis complement each other and create balance." :
                "Nadi Dosha is the most serious incompatibility in Kundli matching. Same Nadi may lead to health issues, genetic problems, or difficulties in having children.",
            remedies: !result.compatible ? `
                <ul>
                    <li><strong>Critical:</strong> Consult experienced astrologers before proceeding</li>
                    <li>Perform Nadi Dosha Nivaran puja and specific homas</li>
                    <li>Consider medical consultation for genetic compatibility</li>
                    <li>Seek blessings from Lord Vishnu and Goddess Lakshmi</li>
                    <li>Perform regular health-promoting spiritual practices</li>
                    <li>Some traditions suggest this dosha can be overcome with other strong positive factors</li>
                </ul>
            ` : null,
            scoring: "Nadi Koot awards 8 points (highest) for different Nadis and 0 points for same Nadi (Nadi Dosha). This is considered the most critical factor."
        }
    };

    return detailedInfo[gunaKey] || {};
}

// Helper function to get Yoni compatibility details
function getYoniCompatibilityDetails(groomYoni, brideYoni, score) {
    const yoniMeanings = {
        "Horse": "Independent, energetic, freedom-loving",
        "Elephant": "Wise, strong, protective",
        "Sheep": "Gentle, peaceful, nurturing",
        "Snake": "Mysterious, intuitive, transformative",
        "Dog": "Loyal, faithful, protective",
        "Cat": "Independent, graceful, selective",
        "Rat": "Quick, adaptable, resourceful",
        "Cow": "Gentle, nurturing, giving",
        "Buffalo": "Strong, steady, hardworking",
        "Tiger": "Powerful, passionate, dominant",
        "Deer": "Gentle, sensitive, artistic",
        "Monkey": "Playful, intelligent, curious",
        "Mongoose": "Alert, protective, brave",
        "Lion": "Royal, confident, leadership"
    };

    const compatibility = score >= 3 ? "Excellent" : score >= 2 ? "Good" : score >= 1 ? "Average" : "Challenging";

    return `
        <p><strong>Groom (${groomYoni}):</strong> ${yoniMeanings[groomYoni] || "Unique characteristics"}</p>
        <p><strong>Bride (${brideYoni}):</strong> ${yoniMeanings[brideYoni] || "Unique characteristics"}</p>
        <p><strong>Compatibility Level:</strong> ${compatibility} (${score}/4 points)</p>
        <p><strong>Physical Harmony:</strong> ${score >= 2 ? "Strong physical attraction and compatibility expected" : "May need patience and understanding in physical relationship"}</p>
    `;
}

// Helper function to get planetary relationship details
function getPlanetaryRelationship(planet1, planet2) {
    const friendships = {
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
    const yoniRelations = {
        "Horse": { enemies: ["Buffalo"], friends: ["Dog"], neutral: ["Tiger", "Snake"] },
        "Elephant": { enemies: ["Lion", "Rat"], friends: [], neutral: ["Dog"] },
        "Sheep": { enemies: [], friends: ["Monkey"], neutral: ["Snake"] },
        "Snake": { enemies: ["Mongoose"], friends: ["Monkey", "Horse"], neutral: ["Sheep"] },
        "Dog": { enemies: ["Monkey"], friends: ["Horse", "Elephant"], neutral: [] },
        "Cat": { enemies: ["Rat"], friends: [], neutral: ["Monkey"] },
        "Rat": { enemies: ["Cat", "Elephant"], friends: ["Buffalo"], neutral: [] },
        "Cow": { enemies: ["Tiger"], friends: [], neutral: ["Lion"] },
        "Buffalo": { enemies: ["Horse"], friends: ["Rat"], neutral: ["Tiger"] },
        "Tiger": { enemies: ["Cow"], friends: [], neutral: ["Buffalo", "Deer"] },
        "Deer": { enemies: [], friends: [], neutral: ["Tiger", "Monkey"] },
        "Monkey": { enemies: ["Dog"], friends: ["Snake", "Sheep", "Deer"], neutral: ["Cat"] },
        "Mongoose": { enemies: ["Snake"], friends: [], neutral: [] },
        "Lion": { enemies: ["Elephant"], friends: [], neutral: ["Cow"] }
    };

    if (groomYoni === brideYoni) {
        return `<p><strong>Same Yoni:</strong> Perfect physical and sexual compatibility. Natural understanding of each other's needs and desires.</p>`;
    }

    const groomRelations = yoniRelations[groomYoni] || {};
    if (groomRelations.enemies && groomRelations.enemies.includes(brideYoni)) {
        return `<p><strong>Enemy Yonis:</strong> ${groomYoni} and ${brideYoni} are natural enemies. This may create significant challenges in physical intimacy and attraction.</p>`;
    } else if (groomRelations.friends && groomRelations.friends.includes(brideYoni)) {
        return `<p><strong>Friendly Yonis:</strong> ${groomYoni} and ${brideYoni} are naturally compatible. Good physical attraction and sexual harmony expected.</p>`;
    } else {
        return `<p><strong>Neutral Yonis:</strong> ${groomYoni} and ${brideYoni} have moderate compatibility. With effort and understanding, physical harmony can be achieved.</p>`;
    }
}
}
}

// Make functions globally available (must be after function definitions)
window.toggleTutorial = toggleTutorial;
window.performMatching = performMatching;
window.scrollToForms = scrollToForms;
window.toggleGunaDetails = toggleGunaDetails;