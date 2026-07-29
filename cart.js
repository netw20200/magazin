// ===== КОРЗИНА =====

let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderCart();

// ===== ОТОБРАЖЕНИЕ КОРЗИНЫ =====

function renderCart(){

    const container = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if(cart.length===0){

        container.innerHTML=`
        <p style="text-align:center;padding:40px;">
        Корзина пуста
        </p>
        `;

        totalPrice.textContent="0 ₴";

        return;
    }

    let total=0;

    container.innerHTML=cart.map((item,index)=>{

        total+=Number(item.price)*item.qty;

        return`

        <div class="cart-card">

            <img src="${item.img}">

            <!-- ===== КОЛИЧЕСТВО ТОВАРА ===== -->

<div class="cart-info">

    <h3>${item.name}</h3>

    <p>${item.price} ₴</p>

<!-- ===== УПРАВЛЕНИЕ ТОВАРОМ ===== -->

<div class="qty-box">

    <button onclick="changeQty(${item.id},-1)">−</button>

    <span>${item.qty}</span>

    <button onclick="changeQty(${item.id},1)">+</button>

    <button class="delete-btn"
        onclick="removeItem(${item.id})">

        🗑️

    </button>

</div>

</div>

        </div>

        `;

    }).join("");

    totalPrice.textContent=total+" ₴";

}

// ===== ОТМЕНИТЬ ЗАКАЗ =====

document.getElementById("cancel-btn").addEventListener("click",()=>{

    if(confirm("Очистить корзину?")){

        localStorage.removeItem("cart");

        location.href="index.html";

    }

});

// ===== ОФОРМИТЬ ЗАКАЗ =====

document.getElementById("checkout-btn").addEventListener("click",()=>{

    alert("Страница оформления заказа будет следующим этапом.");

});
// ===== КОЛИЧЕСТВО ТОВАРА =====

function changeQty(id, change){

    const index = cart.findIndex(item => item.id == id);

    if(index === -1) return;

    cart[index].qty += change;

    if(cart[index].qty <= 0){

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

}
// ===== УДАЛЕНИЕ ТОВАРА =====

function removeItem(id){

    cart = cart.filter(item => item.id != id);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

}
// ===== ОФОРМЛЕНИЕ ЗАКАЗА =====

function checkout(){

    window.location.href = "checkout.html";

}

// ===== ОТМЕНА ЗАКАЗА =====

function cancelOrder(){

    if(!confirm("Очистить корзину?")) return;

    localStorage.removeItem("cart");

    cart=[];

    window.location.href="index.html";

}
