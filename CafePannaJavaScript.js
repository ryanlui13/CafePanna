// nav button
const navbutton = document.getElementById('hamburger');
const links = document.querySelector('.navbar-links');

if (navbutton) {
    navbutton.addEventListener("click", () => {
        navbutton.classList.toggle('open');
        links.classList.toggle('open');
    });
}

// shopping cart
let cart = [];

// ADD TO CART — menu image buttons
const cartButtons = document.querySelectorAll('.add-to-cart');
cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const flavor = button.getAttribute('data-flavor');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.querySelector('data-image'); 
        if (!flavor || isNaN(price)) return;

        const existItem = cart.find(item => item.name === flavor);
        if (existItem) {
            existItem.quantity += 1;
        } else {
            cart.push({ name: flavor, price: price, quantity: 1, image: image });
        }

        renderCart();
    });
});

// PLUS / MINUS inside the cart — event delegation on cart-display
document.getElementById('cart-display').addEventListener('click', (e) => {
    const flavor = e.target.getAttribute('data-flavor');
    if (!flavor) return;

    const item = cart.find(item => item.name === flavor);
    if (!item) return;

    if (e.target.classList.contains('plus-btn')) {
        item.quantity++;
    }

    if (e.target.classList.contains('minus-btn')) {
        item.quantity--;
        if (item.quantity === 0) {
            cart = cart.filter(i => i.name !== flavor);
        }
    }

    renderCart();
});

// RENDER CART
function renderCart() {
    const cartContainer = document.getElementById('cart-display');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-msg">Your pint is empty. Want to start scooping up more flavors?</p>';
        updateTotal();
        return;
    }

    let html = '<ul class="cart-list">';
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        html += `
            <li class="fancy-item">
                <div class="item-main">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div>
                        <strong>${item.name}</strong>
                        <br>$${item.price.toFixed(2)} each
                    </div>
                </div>
                <div class="qty-controls">
                    <button class="minus-btn" data-flavor="${item.name}">−</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="plus-btn" data-flavor="${item.name}">+</button>
                </div>
                <span class="item-price">$${itemTotal.toFixed(2)}</span>
            </li>
        `;
    });
    html += '</ul>';
    cartContainer.innerHTML = html;
    updateTotal();
}

// UPDATE TOTAL
function updateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    const totalDisplay = document.getElementById('total');
    if (totalDisplay) {
        totalDisplay.innerText = `$${total.toFixed(2)}`;
    }
}

// CLEAR CART
function clearCart() {
    cart = [];
    renderCart();
}

//checkout form
document.querySelector('.checkout-btn').addEventListener('click', () => {
    //check to see if cart is empty
    if (cart.length == 0) 
    {
        alert('add an item to your cart');
        return; 
    }
    
    //show the shopping cart and checkout 
    document.getElementById('shopping-cart-selection').style.display = 'none';
    document.getElementById('checkout-form').style.display = 'none';
});

//submitOrder()
function submitOrder() 
{
    //form inputs
    const name = document.getElementById('checkout-name').value;
    const email = document.getElementById('checkout-email').value; 
    const payment = document.getElementById('checkout-payment') 

    //validate
    if (!name || !email || !payment)
    {
        alert('fill in your info');
        return; 
    }

    //hide the form and display confirm message
    document.getElementById('checkout-form').style.display = 'none';
    document.getElementById('confirmation').style.display = 'block';
    document.getElementById('confirm-message').innerHTML = 'Thanks ${name}! Your order is being processed. We will send an email to you at ${email}.';

    //shopping is done. empty now...
    cart = [];
    renderCart();
}

//cancelOrder()
function cancelOrder()
{
    if (cart.length == 0)
    {
        alert('add some flavors to your cart first');
        return; 
    }
    
    document.getElementById('shopping-cart-selection').style.display = 'none';
    document.getElementById('checkout-form').style.display = 'block';
}


