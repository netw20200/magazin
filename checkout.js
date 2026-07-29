// ===== ОТПРАВКА ЗАКАЗА =====

const TELEGRAM_USER = "volkdoma";

function sendOrder(){

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length===0){

        alert("Корзина пустая");

        return;

    }

    const name = document.getElementById("customer-name").value.trim();

    const phone = document.getElementById("customer-phone").value.trim();

    const comment = document.getElementById("customer-comment").value.trim();

    let text = "🛒 Новый заказ\n\n";

    text += "👤 Имя: " + name + "\n";

    text += "📞 Телефон: " + phone + "\n\n";

    text += "Товары:\n";

    let total = 0;

    cart.forEach(item=>{

        text += "• " + item.name + " × " + item.qty + " = " + (item.price*item.qty) + " ₴\n";

        total += item.price*item.qty;

    });

    text += "\n💰 Итого: " + total + " ₴\n";

    if(comment){

        text += "\n💬 Комментарий:\n" + comment;

    }

    const url = "https://t.me/" + TELEGRAM_USER + "?text=" + encodeURIComponent(text);

    window.open(url,"_blank");

}
