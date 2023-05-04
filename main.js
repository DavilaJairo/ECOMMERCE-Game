

//------------------------carrito---------------------------------------
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', addToCart);
});

//funcion para añadir los productos deseados al carrito
function addToCart(event) {
  const product = event.target.getAttribute('data-product');
  const price = event.target.getAttribute('data-price');

  let cart = getCart();

  const item = {
    product: product,
    price: price
  };

  cart.push(item);

  saveCart(cart);

  swal({
    title: "producto agregado al carrito de compras",
    Text: "podes seguir comprando",
    icon: "success",
    button: "gracias"
  });

  // Actualizar la variable cartItems con la nueva información del carrito del almacenamiento local
  cartItems = getCart();

  showCart(); // llamada a la función para mostrar el carrito actualizado
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  cartItems = getCart();
  showCart();
}

function resetCart() {
  localStorage.removeItem('cart');
  cartItems = getCart();
  showCart();

  swal({
    title: "No tienes productos agregados al carrito",
    Text: "Carrito vacio",
    icon: "warning",
    button: "gracias"
  });
}


//---------------------------------------------------------------
let cartItems = getCart();
const cartTable = document.querySelector('#cart-table tbody');
const cartTotal = document.querySelector('#cart-total');
const buyButton = document.querySelector('#buy-button');
const resetButton = document.querySelector('#reset-button');

function showCart() {
  cartTable.innerHTML = '';

  let total = 0;

  cartItems.forEach((item, index) => {
    const row = document.createElement('tr');

    const product = document.createElement('td');
    product.textContent = item.product;

    const price = document.createElement('td');
    price.textContent = `$${item.price}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Eliminar';
    removeButton.addEventListener('click', () => {
      removeItem(index);
    });

    const removeCell = document.createElement('td');
    removeCell.appendChild(removeButton);

    row.appendChild(product);
    row.appendChild(price);
    row.appendChild(removeCell);
    cartTable.appendChild(row);

    total += parseFloat(item.price);
  });

  cartTotal.textContent = `$${total}`;
}

resetButton.addEventListener('click', (event) => {
  event.preventDefault();
  resetCart();
});


showCart();
//---------------------------------------------------------------
buyButton.addEventListener('click', (event) => {
  event.preventDefault();
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const name = formData.get('name');
  const paymentMethod = formData.get('payment');
  const cardNumber = formData.get('card-number');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const address = formData.get('address');
  const city = formData.get('city');
  const zip = formData.get('zip');
  const country = formData.get('country');

  if (name && paymentMethod) {
    const paymentMethods = ['credit-card', 'debit-card', 'mercado-pago', 'paypal'];
    if (paymentMethods.includes(paymentMethod)) {
      swal({
        title: "¡Gracias por su compra!",
        text: `Su compra ha sido procesada con éxito utilizando ${paymentMethod}.`,
        icon: "success",
        button: "Aceptar"
      }).then(() => {
        localStorage.removeItem('cart');
        showCart();
        location.reload();
      });
    } else {
      swal({
        title: "Error",
        text: "Método de pago inválido",
        icon: "error",
        button: "Aceptar"
      });
    }
  } else {
    swal({
      title: "Error",
      text: "Debe completar los campos obligatorios",
      icon: "error",
      button: "Aceptar"
    });
  }
});
