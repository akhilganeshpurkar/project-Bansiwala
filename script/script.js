```javascript
// =========================
// Bansiwala Website Script
// =========================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Bansiwala script loaded");

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

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    Object.assign(topButton.style, {
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "50px",
        height: "50px",
        border: "none",
        borderRadius: "50%",
        background: "#ff6b00",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
        display: "none",
        boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        zIndex: "999"
    });

    window.addEventListener("scroll", () => {
        topButton.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Welcome message
    window.addEventListener("load", () => {
        console.log("Welcome to Bansiwala!");
    });

    // Footer year update
    const footer = document.querySelector("footer p");
    if (footer) {
        footer.innerHTML = `© ${new Date().getFullYear()} Bansiwala. All Rights Reserved.`;
    }

    // Cart functionality for menu page
    const cartBtn = document.getElementById("cartBtn");
    const cartModal = document.getElementById("cartModal");
    const closeBtn = document.querySelector(".close");
    const cartItemsEl = document.getElementById("cartItems");
    const cartTotalEl = document.getElementById("cartTotal");
    const cartCountEl = document.getElementById("cartCount");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const addToCartButtons = Array.from(document.querySelectorAll(".add-to-cart"));

    let cart = [];

    function formatPrice(value) {
        return `₹${value.toFixed(2)}`;
    }

    function updateCartCount() {
        if (!cartCountEl) return;
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;
    }

    function renderCart() {
        if (!cartItemsEl || !cartTotalEl) return;

        cartItemsEl.innerHTML = "";

        if (cart.length === 0) {
            cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
            cartTotalEl.textContent = "0";
            return;
        }

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const itemEl = document.createElement("div");
            itemEl.className = "cart-item";
            itemEl.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity}</p>
                </div>
                <div>
                    <span>${formatPrice(itemTotal)}</span>
                </div>
            `;

            cartItemsEl.appendChild(itemEl);
        });

        cartTotalEl.textContent = total.toFixed(2);
    }

    function addProductToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartCount();
        renderCart();
    }

    function openCartModal() {
        if (!cartModal) return;
        cartModal.classList.add("open");
    }

    function closeCartModal() {
        if (!cartModal) return;
        cartModal.classList.remove("open");
    }

    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.setAttribute("type", "button");
            button.addEventListener("click", () => {
                const name = button.dataset.name;
                const price = Number(button.dataset.price);
                if (!name || Number.isNaN(price)) return;
                addProductToCart(name, price);
                openCartModal();
            });
        });
    }

    if (cartBtn) {
        cartBtn.addEventListener("click", openCartModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeCartModal);
    }

    if (cartModal) {
        cartModal.addEventListener("click", event => {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }
            alert(`Proceeding to checkout with ${cart.reduce((sum, item) => sum + item.quantity, 0)} items. Total: ${formatPrice(cart.reduce((sum, item) => sum + item.price * item.quantity, 0))}`);
            cart = [];
            updateCartCount();
            renderCart();
            closeCartModal();
        });
    }

    updateCartCount();
    renderCart();
});
```
