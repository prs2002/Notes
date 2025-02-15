document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;

    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    const displayCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
            return;
        }

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h3>${item.title}</h3>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    };

    checkoutBtn.addEventListener('click', () => {
        if (confirm('Proceed with checkout?')) {
            localStorage.removeItem('cart');
            alert('Thank you for your purchase!');
            window.location.href = '/shop.html';
        }
    });

    displayCart();
});

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}