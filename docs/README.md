# 🌟 Kundli Matching for Marriage - User Guide

A comprehensive Vedic astrology-based Kundli matching website for marriage compatibility analysis using the traditional **Ashtakoot Guna Milan** system.

## 🚀 Quick Start

### Option 1: Direct Browser Usage (Recommended)

1. **Download/Clone** all project files to your computer
2. **Open `index.html`** in any modern web browser
3. **Start matching** - No installation required!

### Option 2: Local Web Server (For Development)

```bash
# Using Python (if installed)
python -m http.server 8000
# Then open: http://localhost:8000

# Using Node.js (if installed)
npx serve .
# Then open: http://localhost:3000
```

## 📁 Project Structure

```
kundli-matching/
├── index.html              # Main website interface
├── styles.css              # Website styling
├── kundli-engine.js        # Core algorithm engine
├── app.js                  # Application logic
├── test-validation.html    # Algorithm testing suite
├── algorithm-validation.js # Validation scripts
├── ALGORITHM_VALIDATION.md # Technical documentation
└── README.md              # This guide
```

## 🎯 How to Use the Website

### Step 1: Enter Groom's Details

- **Name**: Enter the groom's full name
- **Date of Birth**: Select birth date using date picker
- **Time of Birth**: Enter exact birth time (24-hour format)
- **Birth Place**: Enter city/location of birth

### Step 2: Enter Bride's Details

- **Name**: Enter the bride's full name
- **Date of Birth**: Select birth date using date picker
- **Time of Birth**: Enter exact birth time (24-hour format)
- **Birth Place**: Enter city/location of birth

### Step 3: Get Compatibility Results

1. Click **"Match Kundli"** button
2. View the comprehensive compatibility analysis
3. Review individual Guna scores and recommendations

## 📊 Understanding the Results

### Overall Compatibility Score

- **28-36 points (77-100%)**: 🟢 **Excellent** - Highly compatible match
- **21-27 points (58-75%)**: 🟡 **Good** - Compatible with minor adjustments
- **14-20 points (39-56%)**: 🟠 **Average** - Requires careful consideration
- **0-13 points (0-36%)**: 🔴 **Poor** - Significant compatibility issues

### The 8 Compatibility Factors (Ashtakoot)

#### 1. **Varna Koot** (1 point)

- **Purpose**: Social and spiritual compatibility
- **Good Match**: Groom's varna equal or higher than bride's
- **Varnas**: Brahmin > Kshatriya > Vaishya > Shudra

#### 2. **Vashya Koot** (2 points)

- **Purpose**: Mutual attraction and control
- **Groups**: Chatushpad (4-legged), Manav (Human), Jalachhar (Water), Keet (Insect)
- **Best**: Same group compatibility

#### 3. **Tara Koot** (3 points)

- **Purpose**: Birth star compatibility and fortune
- **Calculation**: Based on Nakshatra positions
- **Favorable**: Janma, Kshema, Mitra Taras

#### 4. **Yoni Koot** (4 points)

- **Purpose**: Sexual and physical compatibility
- **Animals**: 14 different animal symbols
- **Best**: Same animal or friendly animals

#### 5. **Graha Maitri Koot** (5 points)

- **Purpose**: Planetary friendship and mental compatibility
- **Based on**: Nakshatra ruling planets
- **Best**: Same planet or friendly planets

#### 6. **Gana Koot** (6 points)

- **Purpose**: Temperament and nature compatibility
- **Types**: Deva (Divine), Manushya (Human), Rakshasa (Demonic)
- **Avoid**: Deva-Rakshasa combinations

#### 7. **Bhakoot Koot** (7 points)

- **Purpose**: Prosperity and family welfare
- **Based on**: Moon sign (Rashi) positions
- **Doshas**: Dwirdwadash (2-12) and Shashtashtam (6-8)

#### 8. **Nadi Koot** (8 points)

- **Purpose**: Health, progeny, and genetic compatibility
- **Types**: Vata, Pitta, Kapha
- **Critical**: Same Nadi creates Nadi Dosha

## ⚠️ Important Doshas (Incompatibilities)

### 🚨 **Nadi Dosha** (Most Critical)

- **Occurs**: When both have same Nadi (Vata, Pitta, or Kapha)
- **Impact**: Health issues, problems with children
- **Score**: 0/8 points
- **Remedy**: Consult astrologer for specific remedies

### 🚨 **Gana Dosha**

- **Occurs**: Deva Gana + Rakshasa Gana combination
- **Impact**: Temperament clashes, personality conflicts
- **Score**: 0/6 points

### 🚨 **Bhakoot Dosha**

- **Dwirdwadash**: 2nd and 12th position rashis
- **Shashtashtam**: 6th and 8th position rashis
- **Impact**: Financial problems, health issues
- **Score**: 0/7 points

## 🧪 Testing the Algorithm

### Validate Algorithm Accuracy

1. Open `test-validation.html` in your browser
2. Click **"Run Full Validation"** to test algorithm accuracy
3. Review test results and validation reports

### Test Specific Cases

- **Perfect Match**: Same Nakshatra couples
- **Dosha Detection**: Known problematic combinations
- **Edge Cases**: Boundary conditions and special scenarios

## 💡 Usage Tips

### For Best Results:

1. **Accurate Birth Time**: Use exact birth time (within 2-4 minutes)
2. **Correct Birth Place**: Enter the actual birth location
3. **Complete Information**: Fill all fields accurately

### Understanding Limitations:

- **Simplified Calculations**: Uses basic astronomical calculations
- **Birth Place**: Currently not used for geographical corrections
- **Time Zones**: Manual adjustment may be needed for different regions

## 🔧 Technical Features

### Algorithm Highlights:

- ✅ Complete 27 Nakshatra database
- ✅ Traditional Ashtakoot Guna Milan system
- ✅ Accurate dosha detection
- ✅ Comprehensive compatibility analysis
- ✅ Modern responsive web interface

### Browser Compatibility:

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile and tablet responsive
- ✅ No plugins or installations required

## 📱 Mobile Usage

The website is fully responsive and works perfectly on:

- 📱 **Smartphones**: iOS and Android
- 📟 **Tablets**: iPad and Android tablets
- 💻 **Desktops**: All major browsers

## 🎨 Customization

### Modify Styling:

Edit `styles.css` to change:

- Colors and themes
- Layout and spacing
- Font styles and sizes

### Extend Functionality:

Edit `kundli-engine.js` to add:

- Additional compatibility factors
- Regional calculation variations
- Custom scoring systems

## 🆘 Troubleshooting

### Common Issues:

#### "Please fill in all required fields"

- **Solution**: Ensure all form fields are completed
- **Check**: Name, date, time, and place for both individuals

#### Unexpected Results

- **Verify**: Birth time accuracy (AM/PM format)
- **Check**: Date format (YYYY-MM-DD)
- **Confirm**: All information is correct

#### Website Not Loading

- **Try**: Different browser or incognito mode
- **Check**: All files are in the same folder
- **Ensure**: JavaScript is enabled in browser

## 📞 Support & Feedback

### For Technical Issues:

- Check browser console for error messages
- Verify all project files are present
- Try refreshing the page

### For Astrological Questions:

- Consult with qualified Vedic astrologers
- Refer to traditional astrology texts
- Consider the algorithm's limitations

## ⚖️ Disclaimer

This tool provides compatibility analysis based on traditional Vedic astrology principles. Results should be considered as guidance only and not as definitive predictions. For important life decisions, please consult with qualified astrologers and consider multiple factors beyond algorithmic analysis.

---

**Enjoy exploring the ancient wisdom of Vedic astrology with modern technology!** 🌟
