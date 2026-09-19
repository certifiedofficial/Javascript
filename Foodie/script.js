const mealGrid = document.getElementById("meal-grid");
const categories = document.getElementById("categories");
const search = document.getElementById("search");

let meals = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

fetch("food_meals.json")
.then(response => response.json())
.then(data => {
meals = data;
createCategories();
showMeals(meals.slice(0,6));
updateCart();
});

function createCategories(){

const list=["All",...new Set(meals.map(m=>m.category))];

categories.innerHTML="";

list.forEach(category=>{

const button=document.createElement("button");
button.textContent=category;

button.onclick=()=>{

const filtered=category==="All"
? meals
: meals.filter(m=>m.category===category);

showMeals(filtered.slice(0,6));

};

categories.appendChild(button);

});

}

function showMeals(list){

mealGrid.innerHTML="";

list.forEach(meal=>{

const card=document.createElement("div");
card.className="card";

card.innerHTML=`
<img src="${meal.image}">

<div class="info">

<h3>${meal.name}</h3>

<p>${meal.restaurant}</p>

<div class="price">
<span>₦${meal.promo_price||meal.price}</span>
<span>⭐ ${meal.rating}</span>
</div>

</div>

<button>Add to Cart</button>
`;

card.onclick=e=>{
if(e.target.tagName!=="BUTTON"){
location.href=`meal.html?id=${meal.id}`;
}
};

card.querySelector("button").onclick=e=>{

e.stopPropagation();

addToCart(meal);

};

mealGrid.appendChild(card);

});

}

search.addEventListener("input",()=>{

const value=search.value.toLowerCase();

const filtered=meals.filter(meal=>

meal.name.toLowerCase().includes(value)

||meal.category.toLowerCase().includes(value)

||meal.restaurant.toLowerCase().includes(value)

);

showMeals(filtered.slice(0,6));

});

function addToCart(meal,qty=1){

const existing=cart.find(item=>item.id===meal.id);

if(existing){

existing.quantity+=qty;

}else{

cart.push({...meal,quantity:qty});

}

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

}

function updateCart(){

document.getElementById("cart-count").textContent=
cart.reduce((sum,item)=>sum+item.quantity,0);

const cartItems=document.getElementById("cart-items");

cartItems.innerHTML="";

let subtotal=0;

cart.forEach(item=>{

const price=item.promo_price||item.price;

subtotal+=price*item.quantity;

cartItems.innerHTML+=`
<div class="cart-item">
<p>${item.name}</p>
<small>${item.quantity} × ₦${price}</small>
</div>
`;

});

document.getElementById("subtotal").textContent="₦"+subtotal;
document.getElementById("total").textContent="₦"+(subtotal+500);

}

document.querySelector(".checkout").onclick=()=>{

if(cart.length===0){
alert("Your cart is empty.");
return;
}

location.href="checkout.html";

};