
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', addToCart);
});

//funcion para añadir los productos deseados al carrito
function addToCart(event) {
  const product = event.target.getAttribute('data-product');
  const price = event.target.getAttribute('data-price');
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const item = {
    product: product,
    price: price
  };
  
  cart.push(item);
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  swal({
    title: "producto agregado al carrito de compras",
    Text: "podes seguir comprando",
    icon: "success",
    button: "gracias"
  });

  // Actualizar la variable cartItems con la nueva información del carrito del almacenamiento local
  cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  showCart(); // llamada a la función para mostrar el carrito actualizado
}

let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartTable = document.querySelector('#cart-table tbody');
const cartTotal = document.querySelector('#cart-total');
const buyButton = document.querySelector('#buy-button');
const resetButton = document.querySelector('#reset-button');

function showCart() {
  cartTable.innerHTML = '';
  
  let total = 0;
  
  cartItems.forEach(item => {
    const row = document.createElement('tr');
    
    const product = document.createElement('td');
    product.textContent = item.product;
    
    const price = document.createElement('td');
    price.textContent = `$${item.price}`;
    
    row.appendChild(product);
    row.appendChild(price);
    cartTable.appendChild(row);
    
    total += parseFloat(item.price);
  });
  
  cartTotal.textContent = `$${total}`;
}

showCart();

buyButton.addEventListener('click', () => {
  swal({
    title: "¡Gracias por su compra!",
    text: "Su compra ha sido procesada",
    icon: "success",
    button: "Aceptar"
  }).then(() => {
    localStorage.removeItem('cart');

    showCart();// llamada a la función para mostrar el carrito actualizado
    location.reload();
  });
});


resetButton.addEventListener('click', () => {
  localStorage.removeItem('cart');

  // Actualizar la variable cartItems con la nueva información del carrito del almacenamiento local
  cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  showCart(); // llamada a la función para mostrar el carrito actualizado
  location.reload();
});
