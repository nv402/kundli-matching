# Kundli Matching for Marriage

A comprehensive Vedic astrology-based compatibility analysis system using the traditional **Ashtakoot Guna Milan** method with **PDF report generation**.

## 🚀 Quick Start

1. **Open `launch.html`** in your browser to start the application
2. **Or open `index.html`** directly for the main application
3. **Enter birth details** for both groom and bride
4. **Click "Match Kundli"** to get compatibility results
5. **Click "Download PDF Report"** to save results as PDF

## ✨ Features

- **🔮 Ashtakoot Analysis**: Complete 36-point Guna Milan calculation
- **📊 Detailed Scoring**: Individual breakdown of all 8 Kootas
- **🎨 Dark/Light Mode**: Toggle between themes
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **📄 PDF Reports**: Download comprehensive compatibility reports
- **⚡ Real-time Calculations**: Instant results with detailed explanations
- **🎯 Dosha Detection**: Mangal Dosha and other compatibility factors

## 📁 Project Structure

```
/
├── index.html              # Main application
├── launch.html             # Project launcher
├── test-*.html            # Various test pages
├── src/                   # Source files
│   ├── styles.css         # Main stylesheet
│   ├── kundli-engine.js   # Core calculation engine
│   ├── app.js             # Main application logic
│   └── app-minimal.js     # Minimal app version
├── docs/                  # Documentation
│   ├── TECHNICAL_DOCUMENTATION.md
│   ├── ALGORITHM_VALIDATION.md
│   └── [other .md files]
└── scripts/               # Build/deployment scripts
    ├── run.sh
    └── run.bat
```

## 🛠️ Technology Stack

- **HTML5** - Structure and semantics
- **CSS3** - Styling and responsive design
- **Vanilla JavaScript** - Application logic and interactivity
- **jsPDF** - PDF generation and download
- **html2canvas** - HTML to canvas conversion for PDF
- **No Backend** - Pure client-side application

## 📖 How to Use

### Basic Usage

1. Open the application in your browser
2. Enter birth details for both partners:
   - Date of birth
   - Time of birth
   - Place of birth
3. Click "Match Kundli" to generate compatibility analysis
4. Review detailed results and recommendations
5. Click "Download PDF Report" to save results

### PDF Report Features

- **Complete Analysis**: All compatibility scores and details
- **Professional Layout**: Clean, organized PDF format
- **Birth Details**: Both partners' information included
- **Recommendations**: Detailed compatibility advice
- **Printable**: High-quality format for printing

## 🌐 Deployment

### Local Development

```bash
# Using Python (recommended)
cd public
python3 -m http.server 8000
# Open http://localhost:8000

# Using Node.js
npx http-server
```

### Production Deployment

- **GitHub Pages**: Push to GitHub and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **Any Static Host**: Upload files to any web server

## 📚 Documentation

- **[Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md)** - Complete technical overview
- **[Algorithm Validation](docs/ALGORITHM_VALIDATION.md)** - Vedic astrology validation
- **[Project Summary](docs/PROJECT_SUMMARY.md)** - Project overview and features

## 🔧 Development

### File Organization

- **HTML files** in root (for GitHub Pages compatibility)
- **JavaScript/CSS** in `src/` directory
- **Documentation** in `docs/` directory
- **Scripts** in `scripts/` directory

### Adding Features

1. Modify JavaScript files in `src/`
2. Update CSS in `src/styles.css`
3. Test with various HTML files
4. Update documentation as needed

## 📄 PDF Generation

The application includes comprehensive PDF report generation:

- **Automatic Trigger**: Button appears after results generation
- **Complete Content**: All analysis, scores, and recommendations
- **Professional Format**: Clean, printable PDF layout
- **Cross-platform**: Works on all modern browsers

## 🎨 Themes

- **Light Mode**: Clean, professional appearance
- **Dark Mode**: Easy on the eyes, modern look
- **Automatic Switching**: Based on system preferences
- **Manual Toggle**: User can switch themes

## 📱 Responsive Design

- **Desktop**: Full-featured interface
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly controls
- **All Screen Sizes**: Adaptive design

## ⚠️ Disclaimer

This tool is for **informational purposes only**. For important life decisions like marriage, please consult qualified astrologers and professionals. The calculations are based on traditional Vedic astrology principles but should not be the sole basis for decisions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using traditional Vedic astrology principles and modern web technologies.**
