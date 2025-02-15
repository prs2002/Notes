// Token management
const generateToken = () => {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
};

const setToken = (token) => {
    localStorage.setItem('token', token);
};

const getToken = () => {
    return localStorage.getItem('token');
};

const removeToken = () => {
    localStorage.removeItem('token');
};

// User management
const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

const removeUser = () => {
    localStorage.removeItem('user');
};

// Authentication state
const isAuthenticated = () => {
    return !!getToken();
};

// Update UI based on auth state
const updateAuthUI = () => {
    const authLink = document.querySelector('.auth-link');
    const profileLink = document.querySelector('.profile-link');
    
    if (isAuthenticated()) {
        authLink.classList.add('hidden');
        profileLink.classList.remove('hidden');
    } else {
        authLink.classList.remove('hidden');
        profileLink.classList.add('hidden');
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // In a real app, validate against server
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                const token = generateToken();
                setToken(token);
                setUser({ name: user.name, email: user.email });
                window.location.href = '/shop.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Signup form submitted!"); 

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (users.some(u => u.email === email)) {
                alert('Email already exists');
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            const token = generateToken();
            setToken(token);
            setUser({ name, email });
            window.location.href = '/shop.html';
        });
    }

    // Logout Button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            removeToken();
            removeUser();
            window.location.href = '/';
        });
    }
});

// Protected route check
const checkAuth = () => {
    if (!isAuthenticated()) {
        window.location.href = '/login.html';
        return false;
    }
    return true;
};