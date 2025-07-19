# Kundli Matching Project – Technical Documentation

## 1. What is `launch.html` Doing?

`launch.html` is a **project launcher page** for the Kundli Matching web application. Its main purposes are:

- **Landing Page:** Welcomes users and introduces the project.
- **Navigation Hub:** Provides buttons to:
  - **Launch Main Application** (`index.html`)
  - **Algorithm Testing Suite** (`test-validation.html`)
- **Quick Start Guide:** Step-by-step instructions for new users.
- **Feature List:** Highlights key features (Ashtakoot analysis, dosha detection, etc.).
- **Algorithm Validation:** Communicates accuracy and validation status.
- **Disclaimer:** Reminds users the tool is for informational purposes only.

**Summary:**
`launch.html` is a static, styled HTML page that acts as a gateway and informational dashboard for the Kundli Matching project.

---

## 2. Technology Used

### **Frontend:**

- **HTML5:** Structure of all pages.
- **CSS3:** Styling via embedded and external stylesheets (`styles.css`).
- **JavaScript:** Application logic in `app.js`, `app-minimal.js`, and `kundli-engine.js`.
- **No Frameworks:** Uses vanilla JavaScript and CSS (no React, Angular, etc.).

### **Backend:**

- **None (Static Site):** All logic is client-side in the browser.

### **Other:**

- **Responsive Design:** CSS media queries for mobile support.
- **No Build Tools:** No Webpack, Babel, or npm/yarn.

---

## 3. How the Website Works

### **Site Structure:**

- **Entry Point:** Users start at `launch.html`.
- **Main Application:** `index.html` is the primary Kundli Matching interface.
- **Testing Suite:** `test-validation.html` for algorithm validation.

### **Main Application Flow:**

1. **User Input:** Users enter birth details for groom and bride.
2. **Client-Side Processing:** JavaScript processes the input on button click.
3. **Astrological Calculations:** `kundli-engine.js` computes Ashtakoot Guna Milan, dosha detection, and scores.
4. **Results Display:** Results and recommendations are rendered dynamically in the browser.
5. **Styling:** All UI is styled with CSS, supporting light/dark modes and responsive layouts.

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
- `styles.css`: Main stylesheet.
- `app.js`, `app-minimal.js`: Main JavaScript files for UI and logic.
- `kundli-engine.js`: Core astrological calculation engine.

### **How to Use**

1. Open `launch.html` in a browser.
2. Click "Launch Main Application" to start.
3. Enter required birth details and click "Match Kundli."
4. Review compatibility results and recommendations.

### **Technology Stack**

- **HTML5** for structure
- **CSS3** for styling and responsive design
- **Vanilla JavaScript** for logic and interactivity
- **No backend/server**; all logic is client-side

### **Deployment**

- Can be hosted on any static web server (GitHub Pages, Netlify, Vercel, etc.).
- No server-side dependencies or databases required.

### **Extensibility**

- New features can be added by extending JavaScript and updating HTML/CSS.
- Additional test pages can be created for further validation.

### **Limitations**

- All calculations are performed in the browser; no persistent storage or user accounts.
- For professional or legal use, users should consult a qualified astrologer.

---

## 5. Summary Table

| Aspect        | Details                                           |
| ------------- | ------------------------------------------------- |
| Entry Point   | `launch.html`                                     |
| Main App      | `index.html`                                      |
| Technology    | HTML5, CSS3, Vanilla JS                           |
| Backend       | None (static site)                                |
| Core Logic    | `kundli-engine.js`                                |
| Styling       | `styles.css` + inline CSS                         |
| Responsive    | Yes (media queries)                               |
| Hosting       | Any static web server                             |
| Data Privacy  | All processing in-browser; no data sent to server |
| Extensibility | Easy to add features via JS/HTML/CSS              |

---

If you need a more detailed breakdown of any specific file or want a diagram of the architecture, see the project README or contact the maintainer.
