// ===== ОТПРАВКА ЗАКАЗА =====

const TELEGRAM_USER = "volkdoma";
// ===== ВЫВОД ТОВАРОВ =====

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

document.getElementById("checkout-cart").innerHTML = cart.map(item=>{

    total += item.price * item.qty;

    return `
        <div class="checkout-item">

            <span>${item.name}</span>

            <span>${item.qty} × ${item.price} ₴</span>

        </div>
    `;

}).join("");

document.getElementById("checkout-total").innerHTML =
`<h3>Сума: ${total} ₴</h3>`;
function sendOrder(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length===0){

        alert("Корзина пустая");

        return;

    }

    const name = document.getElementById("customer-name").value.trim();

    const phone = document.getElementById("customer-phone").value.trim();

    const comment = document.getElementById("customer-comment").value.trim();

    // ===== ПРОВЕРКА ПОЛЕЙ =====

if(name===""){

    alert("Введите имя");

    return;

}

if(phone===""){

    alert("Введите телефон");

    return;

}

const delivery = document.querySelector('input[name="delivery"]:checked').value;

let addressText = "";

if(delivery==="nova"){

    const city = document.getElementById("customer-city").value.trim();

    const branch = document.getElementById("customer-branch").value.trim();

    if(city===""){

        alert("Введите город");

        return;

    }

    if(branch===""){

        alert("Введите отделение");

        return;

    }

    addressText =
        "Новая Почта\n" +
        "Город: " + city + "\n" +
        "Отделение: " + branch;

}else{

    addressText = "🚶 Самовывоз";

}
    
    let text = " Новый заказ\n\n";

    text += " Имя: " + name + "\n";

    text += "Телефон: " + phone + "\n\n";
    text += addressText + "\n\n";
    text += "Товары:\n";

    let total = 0;

    cart.forEach(item=>{

        text += "• " + item.name + " × " + item.qty + " = " + (item.price*item.qty) + " ₴\n";

        total += item.price*item.qty;

    });

    text += "\n Сума: " + total + " ₴\n";

    if(comment){

        text += "\n💬 Комментарий:\n" + comment;

    }

    const url = "https://t.me/" + TELEGRAM_USER + "?text=" + encodeURIComponent(text);

    window.open(url,"_blank");

}
// ===== СПОСІБ ДОСТАВКИ =====

const pickupCard = document.getElementById("pickup-card");
const novaCard = document.getElementById("nova-card");

const pickupRadio = pickupCard.querySelector("input");
const novaRadio = novaCard.querySelector("input");

const novaFields = document.getElementById("nova-fields");

pickupCard.onclick = function(){

    pickupRadio.checked = true;

    pickupCard.classList.add("active");
    novaCard.classList.remove("active");

    novaFields.style.display = "none";

};

novaCard.onclick = function(){

    novaRadio.checked = true;

    novaCard.classList.add("active");
    pickupCard.classList.remove("active");

    novaFields.style.display = "block";

};
