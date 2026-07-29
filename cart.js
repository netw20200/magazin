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

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>${item.price} ₴ × ${item.qty}</p>

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
