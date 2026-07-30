// ===== ЗАГРУЗКА ТОВАРА =====

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");
// Обновить счетчик корзины
if (typeof updateCartCounter === "function") {
    updateCartCounter();
}
fetch("products.csv")

.then(r=>r.text())

.then(text=>{

const rows=parseCSV(text);

const products=rows.slice(1).map(row=>({

id:(row[0]||"").trim(),

name:(row[1]||"").trim(),

price:(row[3]||"").trim(),

img:"images/" + (row[10]||"").trim(),

description:(row[5]||"").trim()

}));

const product=products.find(p=>p.id===productId);

if(!product){

document.getElementById("product-page").innerHTML="<h2>Товар не найден</h2>";

return;

}

document.getElementById("product-page").innerHTML=`

<img src="${product.img}" class="product-image">

<h1>${product.name}</h1>

<h2>${product.price} ₴</h2>

<p class="product-description">
${product.description}
</p>

<div class="delivery-info">

<h3>
<span class="material-symbols-outlined">local_shipping</span>
Доставка
</h3>

<p>
<span class="material-symbols-outlined">inventory_2</span>
Нова Пошта — відділення або поштомат
</p>

<p>
<span class="material-symbols-outlined">local_shipping</span>
Кур'єрська доставка Новою Поштою
</p>

<p>
<span class="material-symbols-outlined">schedule</span>
Відправка протягом 1 робочого дня
</p>

<h3>
<span class="material-symbols-outlined">payments</span>
Оплата
</h3>

<p>
<span class="material-symbols-outlined">payments</span>
Післяплата (накладений платіж)
</p>

<p>
<span class="material-symbols-outlined">credit_card</span>
Оплата на картку
</p>

<p>
<span class="material-symbols-outlined">account_balance</span>
Оплата за IBAN
</p>

</div>

<button class="btn product-btn"
onclick="addToCart('${product.id}','${product.name}','${product.price}','${product.img}')">
В корзину
</button>

`;

});

function parseCSV(text){

const rows=[];

let row=[];

let current='';

let inQuotes=false;

for(let i=0;i<text.length;i++){

const char=text[i];

const next=text[i+1];

if(char=='"'&&inQuotes&&next=='"'){

current+='"';

i++;

}else if(char=='"'){

inQuotes=!inQuotes;

}else if(char==','&&!inQuotes){

row.push(current);

current='';

}else if((char=='\n'||char=='\r')&&!inQuotes){

if(current||row.length){

row.push(current);

rows.push(row);

row=[];

current='';

}

}else{

current+=char;

}

}

if(current||row.length){

row.push(current);

rows.push(row);

}

return rows;

}
// Кнопка корзины на странице товара
document.getElementById("open-cart").onclick = function () {
    if (typeof updateCartCounter === "function") {
    updateCartCounter();
    }
    window.location.href = "cart.html";
};

// Кнопка меню на странице товара
document.querySelector(".menu-btn").onclick = function () {
    document.querySelector(".side-menu").classList.add("active");
    document.querySelector(".overlay").classList.add("active");
};

document.querySelector(".close-menu").onclick = function () {
    document.querySelector(".side-menu").classList.remove("active");
    document.querySelector(".overlay").classList.remove("active");
};

document.querySelector(".overlay").onclick = function () {
    document.querySelector(".side-menu").classList.remove("active");
    document.querySelector(".overlay").classList.remove("active");
};
