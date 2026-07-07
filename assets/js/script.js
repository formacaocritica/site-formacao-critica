function toggleAccessibilityMenu() {
    const menu = document.getElementById('accessibility-menu');
    if (menu) menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function toggleAccessibility(feature, button) {
    if (!window.accessibilityStates) window.accessibilityStates = {};
    window.accessibilityStates[feature] = !window.accessibilityStates[feature];
    const state = window.accessibilityStates[feature];
    button.textContent = button.textContent.includes('Ativar') ? 
        button.textContent.replace('Ativar', 'Desativar') : 
        button.textContent.replace('Desativar', 'Ativar');

    if (feature === 'high-contrast') document.body.classList.toggle('high-contrast', state);
    if (feature === 'large-text') document.body.classList.toggle('large-text', state);
}

function increaseFontSize() {
    let size = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = (size + 2) + 'px';
}

function decreaseFontSize() {
    let size = parseFloat(getComputedStyle(document.body).fontSize);
    if (size > 14) document.body.style.fontSize = (size - 2) + 'px';
}

// ====================== NAVEGAÇÃO MOBILE (DROPDOWN) ======================
function toggleNavMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.style.display = (navMenu.style.display === 'block') ? 'none' : 'block';
    }
}

// Carrega header e footer
document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
        .then(r => r.text())
        .then(html => document.getElementById('header').innerHTML = html)
        .catch(e => console.error(e));

    fetch('footer.html')
        .then(r => r.text())
        .then(html => document.getElementById('footer').innerHTML = html)
        .catch(e => console.error(e));
});

let isSpeaking = false;

function toggleTextToSpeech() {
    if ('speechSynthesis' in window) {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
        } else {
            const text = document.body.innerText || document.body.textContent;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR';
            utterance.rate = 1.1;
            utterance.pitch = 1;
            
            window.speechSynthesis.speak(utterance);
            isSpeaking = true;

            utterance.onend = () => {
                isSpeaking = false;
            };
        }
    } else {
        alert("Seu navegador não suporta leitura em voz alta.");
    }
}