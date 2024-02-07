let iconCart = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart-icon span');
let UserData;

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

document.querySelector('.checkOut').addEventListener('click', function (event) {
    // Prevent default behavior if the cart is empty
    if (carts.length === 0) {
        event.preventDefault();
        alert('Your cart is empty. Please add items to proceed to checkout.');
    } else {
        const cartData = JSON.stringify(carts);
        window.location.href = `checkout.html?cart=${encodeURIComponent(cartData)}`;
    }
});

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
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    };
});

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

var clearCart = () => {
    localStorage.setItem('cart', "");
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}
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

    // Display total amount somewhere in your HTML, e.g., assuming you have an element with class "totalAmount"
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


const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }

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

            //retrieve userdata
            UserData = JSON.parse(localStorage.getItem('UserData'));
            //alert(UserData.username);
        })
}


initApp();
