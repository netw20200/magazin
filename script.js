const TELEGRAM_USER = 'volkdoma';
// ===== КОРЗИНА =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let allProducts = [];

async function loadProducts() {
  try {
    const response = await fetch('./products.csv');
    if (!response.ok) throw new Error('Файл products.csv не найден');
    
    const text = await response.text();
    const rows = parseCSV(text);

    allProducts = rows.slice(1)
.map(row=>({

    id:(row[0] || '').trim(),

    name:(row[1] || '').trim(),

    price:(row[3] || '').trim(),

    thumbnail:"images/" + (row[10] || '').trim()

}))
.filter(p=>p.name.length>1);

    renderProducts(allProducts);
  } catch (err) {
    document.getElementById('products').innerHTML = 
      `<div class="error">Не удалось загрузить товары.<br>Проверь, что файл products.csv загружен в репозиторий.</div>`;
    console.error(err);
  }
}

function parseCSV(text) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  let row = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(current);
      current = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (current || row.length > 0) {
        row.push(current);
        rows.push(row);
        row = [];
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

function renderProducts(products) {
  const container = document.getElementById('products');

  if (products.length === 0) {
    container.innerHTML = '<div class="empty">Ничего не найдено</div>';
    return;
  }

  container.innerHTML = products.map(p => {
    const price = p.price ? p.price + ' ₴' : '';
    const img = p.thumbnail || 'https://via.placeholder.com/300x300?text=Нет+фото';
    const message = encodeURIComponent(`Здравствуйте! Хочу заказать:\n\n${p.name}\nЦена: ${p.price} ₴`);
    const tgLink = `https://t.me/${TELEGRAM_USER}?text=${message}`;
    return `

      <!-- ===== ПЕРЕХОД НА СТРАНИЦУ ТОВАРА ===== -->

<div class="card"

onclick="openProduct('${p.id}')">

        <img src="${img}" alt="${p.name}" loading="lazy"
onerror="this.src='https://via.placeholder.com/300x300?text=Нет+фото'">
           <div class="card-body">
          <div class="card-title">${p.name}</div>
          <div class="card-price">${price}</div>
          <button class="btn"
onclick="event.stopPropagation(); addToCart('${p.id}','${p.name}','${p.price}','${img}')"
В корзину
</button>
        </div>
      </div>
    `;
  }).join('');
}

// Поиск
document.getElementById('search').addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase().trim();
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// Запуск
loadProducts();


// ===== Меню =====

const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");
const closeMenu = document.querySelector(".close-menu");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
});

closeMenu.addEventListener("click", closeSideMenu);
overlay.addEventListener("click", closeSideMenu);

function closeSideMenu() {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
}
    // ===== Swiper =====

new Swiper(".mySwiper", {
    slidesPerView: 2.3,
    spaceBetween: 12,

    loop: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});
// ===== КОРЗИНА =====

function addToCart(id,name,price,img){

    const index = cart.findIndex(item=>item.id==id);

    if(index>-1){

        cart[index].qty++;

    }else{

        cart.push({

    id:id,

    name:name,
            price:Number(price.replace(",",".")),
            img:img,
            qty:1

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCounter();

    alert("Товар добавлен в корзину");

}

// ===== СЧЕТЧИК =====

function updateCartCounter(){

    const count = cart.reduce((sum,item)=>sum+item.qty,0);

    const cartCount=document.getElementById("cart-count");

    if(cartCount){

        cartCount.textContent=count;

    }

}

updateCartCounter();

// ===== ПЕРЕХОД В КОРЗИНУ =====

const openCart = document.getElementById("open-cart");

if(openCart){

    openCart.addEventListener("click", () => {

        window.location.href = "cart.html";

    });

}
// ===== ОТКРЫТЬ ТОВАР =====

function openProduct(id){

    window.location.href = "product.html?id=" + id;

          }
