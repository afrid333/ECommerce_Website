// Product Data (Mock)
const products = [
    { id: 1, name: "Smartphone", category: "electronics", price: 499, img: "images/phone.jpg" },
    { id: 2, name: "Laptop", category: "electronics", price: 899, img: "images/laptop.jpg" },
    { id: 3, name: "T-shirt", category: "clothing", price: 19, img: "images/tshirts.jpg" },
    { id: 4, name: "Watch", category: "accessories", price: 49, img: "images/watch.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from LocalStorage

// Display Products
function displayProducts(filter = "all", search = "") {
    const productList = document.querySelector(".product-list");
    productList.innerHTML = "";

    products
        .filter(product => (filter === "all" || product.category === filter) && 
                            product.name.toLowerCase().includes(search.toLowerCase()))
        .forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productElement);
        });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = "";
    
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.innerHTML = `
                ${item.name} - $${item.price} (x${item.quantity}) 
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to LocalStorage
}

// Handle Filters
document.getElementById("category-filter").addEventListener("change", (e) => {
    displayProducts(e.target.value, document.getElementById("search-bar").value);
});

document.getElementById("search-bar").addEventListener("input", (e) => {
    displayProducts(document.getElementById("category-filter").value, e.target.value);
});

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCart();
});
