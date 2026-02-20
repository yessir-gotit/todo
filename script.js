const toggleTheme = document.getElementById('theme-toggle');
const html = document.documentElement;
const toggleWrapper = document.querySelector('.theme-toggle-wrapper')

// Loads THEME
if (html.getAttribute('data-theme') === 'light'){
    toggleTheme.checked = true;
}

// toggle theme animation
toggleWrapper.classList.add('visible')

// Toggle theme
toggleTheme.addEventListener('change', () => {
    if (toggleTheme.checked) {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
    else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
})

