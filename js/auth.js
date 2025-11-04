document.addEventListener('DOMContentLoaded', function() {

    // Check for login link on pages like beranda.html and kontak.html
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            loginLink.textContent = storedUsername;
            loginLink.href = '#'; // Prevent redirection
            loginLink.style.pointerEvents = 'none'; // Make the name unclickable
            loginLink.style.cursor = 'default';
        }
    }

    // Logic for the Sign In page (in.html)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const usernameInput = document.getElementById('username');
            const username = usernameInput.value;

            if (username) {
                // Store username in sessionStorage
                sessionStorage.setItem('username', username);

                // Redirect to the homepage
                window.location.href = '../beranda.html';
            }
        });
    }

    // Logic for the Sign Up page (up.html)
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const usernameInput = document.getElementById('username');
            const username = usernameInput.value;

            if (username) {
                // Store username in sessionStorage
                sessionStorage.setItem('username', username);

                // Redirect to the homepage
                window.location.href = '../beranda.html';
            }
        });
    }
});