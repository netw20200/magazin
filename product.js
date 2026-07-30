// ===== ЗАГРУЗКА ТОВАРА =====

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

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
    window.location.href = "cart.html";
};
