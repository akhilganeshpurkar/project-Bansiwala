// ================= CART FUNCTIONALITY =================

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartCount) cartCount.textContent = cart.length;
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
            cartTotal.textContent = '0';
        } else {
            let total = 0;
            cartItems.innerHTML = cart.map((item, index) => {
                total += item.price * item.qty;
                return `
                    <div class="cart-item">
                        <div class="item-info">
                            <h4>${item.name}</h4>
                            <p>₹${item.price} × ${item.qty}</p>
                        </div>
                        <div class="item-actions">
                            <button class="qty-btn" onclick="decrementQty(${index})">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="incrementQty(${index})">+</button>
                            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    </div>
                `;
            }).join('');
            cartTotal.textContent = total;
        }
    }
    
    saveCart();
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            name: name,
            price: parseInt(price),
            qty: 1
        });
    }
    
    updateCartUI();
    alert(`${name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function incrementQty(index) {
    cart[index].qty += 1;
    updateCartUI();
}

function decrementQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        removeFromCart(index);
    }
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add to Cart button listeners
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const name = button.dataset.name;
            const price = button.dataset.price;
            addToCart(name, price);
        });
    });
    
    updateCartUI();
});

// Cart Modal
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const closeBtn = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkoutBtn');

if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCartUI();
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const items = cart.map(item => `${item.name} (${item.qty}x ₹${item.price})`).join(', ');
        const message = `Order from Bansiwala: ${items}. Total: ₹${total}`;
        
        const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
        
        cart = [];
        saveCart();
        updateCartUI();
        cartModal.style.display = 'none';
        alert('Order sent to WhatsApp!');
    });
}

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// ================= EXISTING FUNCTIONALITY =================

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Highlight active navigation item while scrolling
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// Reveal cards while scrolling
const cards = document.querySelectorAll(".card");

function revealCards() {

    const trigger = window.innerHeight * 0.85;

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if (top < trigger) {

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }

    });

}

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s ease";

});

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);

// Hero fade-in
window.addEventListener("load", () => {

    const hero = document.querySelector(".hero-text");

    if (hero) {

        hero.style.opacity = "0";
        hero.style.transform = "translateY(40px)";
        hero.style.transition = "1s ease";

        setTimeout(() => {
            hero.style.opacity = "1";
            hero.style.transform = "translateY(0)";
        }, 200);

    }

});

// Back to top button
const topButton = document.createElement("button");

topButton.innerHTML = "↑";
topButton.id = "topBtn";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.bottom = "25px";
topButton.style.right = "25px";
topButton.style.width = "50px";
topButton.style.height = "50px";
topButton.style.border = "none";
topButton.style.borderRadius = "50%";
topButton.style.background = "#ff6b00";
topButton.style.color = "#fff";
topButton.style.fontSize = "22px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.boxShadow = "0 4px 10px rgba(0,0,0,0.25)";
topButton.style.zIndex = "999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// Welcome message
window.addEventListener("load", () => {

    console.log("Welcome to Bansiwala!");

});

// Footer year update
const footer = document.querySelector("footer p");

if (footer) {

    const year = new Date().getFullYear();
    footer.innerHTML = `© ${year} Bansiwala. All Rights Reserved.`;

}
