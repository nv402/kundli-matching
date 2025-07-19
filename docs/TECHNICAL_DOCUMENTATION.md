# Kundli Matching Project – Technical Documentation

## 1. What is `launch.html` Doing?

`launch.html` is a **project launcher page** for the Kundli Matching web application. Its main purposes are:

- **Landing Page:** Welcomes users and introduces the project.
- **Navigation Hub:** Provides buttons to:
  - **Launch Main Application** (`index.html`)
  - **Algorithm Testing Suite** (`test-validation.html`)
- **Quick Start Guide:** Step-by-step instructions for new users.
- **Feature List:** Highlights key features (Ashtakoot analysis, dosha detection, PDF download, etc.).
- **Algorithm Validation:** Communicates accuracy and validation status.
- **Disclaimer:** Reminds users the tool is for informational purposes only.

**Summary:**
`launch.html` is a static, styled HTML page that acts as a gateway and informational dashboard for the Kundli Matching project.

---

## 2. Technology Used

### **Frontend:**

- **HTML5:** Structure of all pages.
- **CSS3:** Styling via external stylesheets (`src/styles.css`).
- **JavaScript:** Application logic in `src/app.js`, `src/app-minimal.js`, and `src/kundli-engine.js`.
- **PDF Generation:** jsPDF library for PDF report generation and download.
- **HTML to Canvas:** html2canvas library for converting HTML content to images for PDF.
- **No Frameworks:** Uses vanilla JavaScript and CSS (no React, Angular, etc.).

### **Backend:**

- **None (Static Site):** All logic is client-side in the browser.

### **External Libraries:**

- **jsPDF (v2.5.1):** For PDF generation and download functionality.
- **html2canvas (v1.4.1):** For converting HTML content to canvas for PDF inclusion.

### **Other:**

- **Responsive Design:** CSS media queries for mobile support.
- **Dark/Light Mode:** Theme switching functionality.
- **No Build Tools:** No Webpack, Babel, or npm/yarn.

---

## 3. How the Website Works

### **Site Structure:**

- **Entry Point:** Users start at `launch.html`.
- **Main Application:** `index.html` is the primary Kundli Matching interface.
- **Testing Suite:** `test-validation.html` for algorithm validation.
- **Source Files:** All JavaScript and CSS files are organized in `src/` directory.

### **Main Application Flow:**

1. **User Input:** Users enter birth details for groom and bride.
2. **Client-Side Processing:** JavaScript processes the input on button click.
3. **Astrological Calculations:** `src/kundli-engine.js` computes Ashtakoot Guna Milan, dosha detection, and scores.
4. **Results Display:** Results and recommendations are rendered dynamically in the browser.
5. **PDF Generation:** Users can download comprehensive PDF reports of compatibility results.
6. **Styling:** All UI is styled with CSS, supporting light/dark modes and responsive layouts.

### **PDF Download Feature:**

- **Trigger:** "Download PDF Report" button appears after results are generated.
- **Content:** Includes complete compatibility analysis, birth details, scores, and recommendations.
- **Format:** Professional PDF with proper styling and layout.
- **Libraries:** Uses jsPDF for PDF generation and html2canvas for content conversion.

### **Testing and Validation:**

- **Test Pages:** Files like `test-validation.html` and `test-styled-results.html` are used for validation.

### **No Server-Side Processing:**

- All data stays in the browser; no server or database is used.

---

## 4. Technical Overview

### **Key Files**

- `launch.html`: Project launcher and info dashboard.
- `index.html`: Main Kundli Matching application.
- `test-validation.html`, `test-styled-results.html`: Testing and validation pages.
- `src/styles.css`: Main stylesheet.
- `src/app.js`, `src/app-minimal.js`: Main JavaScript files for UI and logic.
- `src/kundli-engine.js`: Core astrological calculation engine.
- `docs/`: Documentation files.
- `scripts/`: Build and deployment scripts.

### **Project Structure**

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

### **How to Use**

1. Open `launch.html` in a browser.
2. Click "Launch Main Application" to start.
3. Enter required birth details and click "Match Kundli."
4. Review compatibility results and recommendations.
5. Click "Download PDF Report" to save results as PDF.

### **Technology Stack**

- **HTML5** for structure
- **CSS3** for styling and responsive design
- **Vanilla JavaScript** for logic and interactivity
- **jsPDF** for PDF generation
- **html2canvas** for HTML to canvas conversion
- **No backend/server**; all logic is client-side

### **Deployment**

- Can be hosted on any static web server (GitHub Pages, Netlify, Vercel, etc.).
- No server-side dependencies or databases required.
- All external libraries are loaded via CDN.

### **Extensibility**

- New features can be added by extending JavaScript and updating HTML/CSS.
- Additional test pages can be created for further validation.
- PDF generation can be customized for different report formats.

### **Limitations**

- All calculations are performed in the browser; no persistent storage or user accounts.
- PDF generation requires internet connection for CDN libraries.
- For professional or legal use, users should consult a qualified astrologer.

---

## 5. Summary Table

| Aspect         | Details                                           |
| -------------- | ------------------------------------------------- |
| Entry Point    | `launch.html`                                     |
| Main App       | `index.html`                                      |
| Technology     | HTML5, CSS3, Vanilla JS, jsPDF, html2canvas       |
| Backend        | None (static site)                                |
| Core Logic     | `src/kundli-engine.js`                            |
| Styling        | `src/styles.css` + inline CSS                     |
| PDF Feature    | Download comprehensive compatibility reports      |
| Responsive     | Yes (media queries)                               |
| Hosting        | Any static web server                             |
| Data Privacy   | All processing in-browser; no data sent to server |
| Extensibility  | Easy to add features via JS/HTML/CSS              |
| File Structure | Organized with src/, docs/, scripts/ directories  |

---

If you need a more detailed breakdown of any specific file or want a diagram of the architecture, see the project README or contact the maintainer.
