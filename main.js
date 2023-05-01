

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

showCart();
//---------------------------------------------------------------
/*buyButton.addEventListener('click', () => {
  swal({
    title: "Confirmación de compra",
    html: `<p>Por favor, confirme su compra:</p><p>Nombre: <input id="name" type="text"></p><p>Tipo de pago:
    <select id="payment-method">
        <option value="credit-card">Tarjeta de crédito</option>
        <option value="debit-card">Tarjeta de débito</option>
        <option value="paypal">PayPal</option>
        <option value="mercado-pago">Mercado Pago</option>
    </select></p>`,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      const name = document.getElementById("name").value;
      const paymentMethod = document.getElementById("payment-method").value;
      const paymentResult = simulatePayment(); // Simula el proceso de pago

      // Mostrar un mensaje de éxito o fracaso, dependiendo del resultado del pago simulado
      if (paymentResult === "success") {
        swal({
          title: "¡Gracias por su compra!",
          text: `Su compra ha sido procesada con éxito con ${paymentMethod}.`,
          icon: "success",
          button: "Aceptar"
        }).then(() => {
          localStorage.removeItem('cart');

          showCart(); // Llamada a la función para mostrar el carrito actualizado
          location.reload();
        });
      } else {
        swal({
          title: "Error al procesar su pago",
          text: "Lo siento, no pudimos procesar su pago. Por favor, inténtelo de nuevo más tarde.",
          icon: "error",
          button: "Aceptar"
        });
      }
    }
  });
});

function simulatePayment() {
  // Esta función simula el proceso de pago. Puede devolver "success" o "error" aleatoriamente para probar la pantalla de confirmación.
  return Math.random() < 0.5 ? "success" : "error";
}*/

buyButton.addEventListener('click', () => {
  const name = prompt('Ingrese su nombre:');
  if (name) {
    const paymentMethods = ['tarjeta de credito', 'tarjeta de debito', 'mercado pago', 'paypal'];
    const paymentMethod = prompt('Seleccione el método de pago: ' + paymentMethods.join(', '));

    if (paymentMethods.includes(paymentMethod)) {
      const cardNumber = prompt('Ingrese el número de su tarjeta de pago:');

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
      text: "Debe ingresar su nombre",
      icon: "error",
      button: "Aceptar"
    });
  }
});


