let products = [];
let filteredProducts = [];

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        filteredProducts = [...products];
        displayProducts();
        setupFilters();
    } catch (error) {
        console.error('Error fetching products:', error);
        document.getElementById('products-grid').innerHTML = 'Error loading products. Please try again later.';
    }
}

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

function setupFilters() {
    // Setup search
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', filterProducts);

    // Setup categories
    const categories = [...new Set(products.map(p => p.category))];
    const categoryFilters = document.getElementById('category-filters');
    categoryFilters.innerHTML = categories.map(category => `
        <div>
            <input type="checkbox" id="${category}" name="category" value="${category}">
            <label for="${category}">${category}</label>
        </div>
    `).join('');

    // Setup price filter
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    priceRange.addEventListener('input', (e) => {
        priceValue.textContent = `$${e.target.value}`;
        filterProducts();
    });

    // Add event listeners to category checkboxes
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(checkbox => checkbox.value);
    const maxPrice = parseFloat(document.getElementById('price-range').value);

    filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts();
}

// Initialize the shop page
fetchProducts();