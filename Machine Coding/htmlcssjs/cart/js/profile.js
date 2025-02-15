document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;

    const profileForm = document.getElementById('profileForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    // Load user data
    const user = getUser();
    if (user) {
        nameInput.value = user.name;
        emailInput.value = user.email;
    }

    // Handle profile updates
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const updatedUser = {
            ...user,
            name: nameInput.value
        };

        setUser(updatedUser);
        alert('Profile updated successfully!');
    });
});