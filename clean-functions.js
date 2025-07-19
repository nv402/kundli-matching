// Clean version of essential functions for testing

function toggleTutorial() {
    console.log('toggleTutorial called');
    const tutorialContent = document.getElementById('tutorial-content');
    const tutorialIcon = document.getElementById('tutorial-icon');

    if (!tutorialContent || !tutorialIcon) {
        console.error('Elements not found');
        return;
    }

    const isHidden = tutorialIcon.textContent.includes('Show Tutorial');
    console.log('Is hidden:', isHidden);

    if (isHidden) {
        tutorialContent.style.display = 'block';
        tutorialContent.style.opacity = '1';
        tutorialContent.style.maxHeight = 'none';
        tutorialContent.style.visibility = 'visible';
        tutorialIcon.textContent = '📚 Hide Tutorial';
        console.log('Showing tutorial');
    } else {
        tutorialContent.style.display = 'none';
        tutorialIcon.textContent = '📖 Show Tutorial';
        console.log('Hiding tutorial');
    }
}

function performMatching() {
    console.log('performMatching called');
    alert('Match Kundli function works!');
}

// Make functions globally available
window.toggleTutorial = toggleTutorial;
window.performMatching = performMatching;

console.log('Clean functions loaded successfully');