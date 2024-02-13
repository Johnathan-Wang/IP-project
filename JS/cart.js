// Select elements from the DOM and assign them to variables
let iconCart = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart-icon span');
let UserData;

// Make arrays to store product and cart data
let listProducts = [];
let carts = [];

// Event listener for clicking on the cart icon to toggle cart display
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Event listener for clicking on the close button to toggle cart display
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Event listener for clicking on the checkout button
document.querySelector('.checkOut').addEventListener('click', function (event) {
    //  alert the user if cart is empty
    if (carts.length === 0) {
        event.preventDefault();
        alert('Your cart is empty. Please add items to proceed to checkout.');
    } else {
        // Go checkout page if cart not empty
        const cartData = JSON.stringify(carts);
        window.location.href = `checkout.html?cart=${encodeURIComponent(cartData)}`;
    }
});

// Put product data into HTML
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <iframe title="${product.name}" frameborder="0" allowfullscreen mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered
            web-share"
            srcdoc="${product.model}" scrolling="no">
            </iframe>
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">
                    Add To Cart
                </button>
            `;
            listProductHTML.appendChild(newProduct);
        });
    };
};

// Event listener for clicking on the add to cart button
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    };
});

// Function to add a product to the cart
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });

    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

// Function to clear the cart
var clearCart = () => {
    localStorage.setItem('cart', "");
    addCartToHTML();
    addCartToMemory();
}

// Function to store cart data in local storage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

// Put cart data into HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalAmount = getTotalAmount(); // Calculate total amount
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `<div class="model">
                <iframe title="${info.name}" frameborder="0" allowfullscreen mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered
                web-share
                srcdoc="${info.model}" scrolling="no"></iframe>
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">
                $${info.price * cart.quantity}
            </div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
            </div>`;
            listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;

    // Display total amount 
    document.querySelector('.totalAmount').innerText = `$${totalAmount}`;

    // Get checkout button
    const checkoutButton = document.querySelector('.checkOut');

    // Disable checkout button if cart is empty
    if (carts.length === 0) {
        checkoutButton.setAttribute('disabled', 'disabled');
    } else {
        checkoutButton.removeAttribute('disabled');
    }
};

// Function to change quantity of a product in the cart
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
};

// Function to calculate total amount of items in the cart
const getTotalAmount = () => {
    let totalAmount = 0;
    carts.forEach(cart => {
        let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
        if (positionProduct >= 0) {
            let info = listProducts[positionProduct];
            totalAmount += info.price * cart.quantity;
        }
    });

    // Store the total amount in local storage
    localStorage.setItem('totalAmount', totalAmount);

    return totalAmount;
};

// Function to make the application
const initApp = () => {
    // Fetch product data from 'products.json'
    fetch('JSON/products.json')
        .then(response => response.json())
        .then(data => {
            // Store product data
            listProducts = data;
            // Send product data into HTML
            addDataToHTML();

            // Check if cart data exists in local storage and send it into HTML
            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }

            // Event listener for clicking on the cart items to change quantity
            listCartHTML.addEventListener('click', (event) => {
                let positionClick = event.target;
                if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
                    let product_id = positionClick.parentElement.parentElement.dataset.id;
                    let type = 'minus';
                    if (positionClick.classList.contains('plus')) {
                        type = 'plus';
                    }
                    changeQuantity(product_id, type);
                }
            })

            // Retrieve user data
            UserData = JSON.parse(localStorage.getItem('UserData'));
        })
}


initApp();
