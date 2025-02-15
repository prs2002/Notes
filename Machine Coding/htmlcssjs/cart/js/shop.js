document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    const productsContainer = document.getElementById('productsContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.querySelectorAll('#categoryFilters input');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    // Fetch products
    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            products = await response.json();
            filterAndDisplayProducts();
        } catch (error) {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    };

    // Filter and display products
    const filterAndDisplayProducts = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategories = Array.from(categoryFilters)
            .filter(input => input.checked)
            .map(input => input.value);
        const maxPrice = parseInt(priceRange.value);

        const filteredProducts = products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = product.price <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });

        displayProducts(filteredProducts);
    };

    // Display products
    const displayProducts = (products) => {
        productsContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 100)}...</p>
                <div class="product-price">$${product.price}</div>
                <button onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    Add to Cart
                </button>
            </div>
        `).join('');
    };

    // Event listeners
    searchInput.addEventListener('input', filterAndDisplayProducts);
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterAndDisplayProducts);
    });

    priceRange.addEventListener('input', (e) => {
        const value = e.target.value;
        priceValue.textContent = `$0 - $${value}`;
        filterAndDisplayProducts();
    });

    // Initial load
    fetchProducts();
});

// Add to cart function
function addToCart(product) {
    if (!checkAuth()) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart!');
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    document.querySelector('.cart-count').textContent = count;
}

// Initial cart count update
updateCartCount();