// ----------------------
//  DATOS DE PRODUCTOS
// ----------------------
const productos = [
    {
        image: { thumbnail: "./assets/images/image-waffle-thumbnail.jpg" },
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.5
    },
    {
        image: { thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg" },
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.0
    },
    {
        image: { thumbnail: "./assets/images/image-macaron-thumbnail.jpg" },
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.0
    },
    {
        image: { thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg" },
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.5
    },
    {
        image: { thumbnail: "./assets/images/image-baklava-thumbnail.jpg" },
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.0
    },
    {
        image: { thumbnail: "./assets/images/image-meringue-thumbnail.jpg" },
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.0
    },
    {
        image: { thumbnail: "./assets/images/image-cake-thumbnail.jpg" },
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.5
    },
    {
        image: { thumbnail: "./assets/images/image-brownie-thumbnail.jpg" },
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 4.5
    },
    {
        image: { thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg" },
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.5
    }
];

// ----------------------
//   VARIABLES GLOBALES
// ----------------------
const listaProductos = document.getElementById("listaProductos");
const carritoItems = document.getElementById("carritoItems");
const carritoVacio = document.getElementById("carritoVacio");
const totalCarrito = document.getElementById("totalCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const carritoResumen = document.getElementById("carritoResumen");

let carrito = [];

// ----------------------
//   MOSTRAR PRODUCTOS
// ----------------------
function renderProductos() {
    listaProductos.innerHTML = "";
    productos.forEach((p, i) => {
        const card = document.createElement("div");
        card.className =
            "bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition relative";

        card.innerHTML = `
      <img src="${p.image.thumbnail}" alt="${p.name}" class="w-full h-52 object-cover">
      <div class="p-4">
        <p class="text-sm text-gray-500">${p.category}</p>
        <h3 class="font-semibold">${p.name}</h3>
        <p class="text-[#7b3f00] font-bold mt-1">$${p.price.toFixed(2)}</p>
      </div>
      <button class="absolute left-1/2 -bottom-4 transform -translate-x-1/2 bg-[#fcf9f7] border-2 border-[#7b3f00] text-[#7b3f00] font-semibold py-1 px-4 rounded-full flex items-center gap-2 hover:bg-[#7b3f00] hover:text-white transition">
        🛒 Add to Cart
      </button>
    `;

        // ✅ Agregamos el evento desde JS (evita que falle la referencia)
        card.querySelector("button").addEventListener("click", () => agregar(i));

        listaProductos.appendChild(card);
    });
}

// ----------------------
//   AGREGAR AL CARRITO
// ----------------------
function agregar(index) {
    const producto = productos[index];
    const item = carrito.find(p => p.name === producto.name);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

// ----------------------
//   ACTUALIZAR CARRITO
// ----------------------
function actualizarCarrito() {
    carritoItems.innerHTML = "";

    if (carrito.length === 0) {
        carritoVacio.classList.remove("hidden");
        carritoResumen.classList.add("hidden");
        contadorCarrito.textContent = 0;
        totalCarrito.textContent = "$0.00";
        return;
    }

    carritoVacio.classList.add("hidden");
    carritoResumen.classList.remove("hidden");

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((p, i) => {
        total += p.price * p.cantidad;
        cantidadTotal += p.cantidad;

        const li = document.createElement("li");
        li.className = "flex justify-between items-center border-b pb-2";
        li.innerHTML = `
      <div>
        <p class="font-semibold text-[#7b3f00]">${p.name}</p>
        <p class="text-gray-600 text-sm">
          $${p.price.toFixed(2)} x ${p.cantidad}
          <span class="font-semibold text-[#7b3f00]">
            = $${(p.price * p.cantidad).toFixed(2)}
          </span>
        </p>
      </div>
      <div class="flex gap-1">
        <button class="px-2 bg-gray-200 rounded">-</button>
        <button class="px-2 bg-gray-200 rounded">+</button>
      </div>
    `;

        const [btnMenos, btnMas] = li.querySelectorAll("button");
        btnMenos.addEventListener("click", () => cambiarCantidad(i, -1));
        btnMas.addEventListener("click", () => cambiarCantidad(i, 1));

        carritoItems.appendChild(li);
    });

    totalCarrito.textContent = `$${total.toFixed(2)}`;
    contadorCarrito.textContent = cantidadTotal;
}

// ----------------------
//   CAMBIAR CANTIDAD
// ----------------------
function cambiarCantidad(i, delta) {
    carrito[i].cantidad += delta;
    if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
    actualizarCarrito();
}

// ----------------------
//   INICIALIZAR
// ----------------------
renderProductos();
