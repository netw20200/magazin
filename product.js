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

img:(row[10]||"").trim(),

description:(row[5]||"").trim()

}));

const product=products.find(p=>p.id===productId);

if(!product){

document.getElementById("product-page").innerHTML="<h2>Товар не найден</h2>";

return;

}

document.getElementById("product-page").innerHTML=`

<p>${product.img}</p>

<img src="${product.img}" style="width:300px">

<h1>${product.name}</h1>

<h2>${product.price} ₴</h2>

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
