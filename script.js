const submit = document.querySelector("#add");
const update = document.querySelector("#update");
const content = document.querySelector("#tableBody");

const API = "https://sfbackend-uwjg.onrender.com/api/orders";

submit.addEventListener("click", () => {

let customer_name = document.querySelector("#customer").value;
let pizza_type = document.querySelector("#pizzaType").value;
let size = document.querySelector("#pizzaSize").value;
let quantity = document.querySelector("#quantity").value;
let instructions = document.querySelector("#instructions").value;

let formData = {customer_name,pizza_type,size,quantity,instructions};

fetch(API,{
method:"POST",
body:JSON.stringify(formData),
headers:{ "Content-Type":"application/json"}
});

alert("Order Added");
location.reload();

});


window.addEventListener("load",()=>{
getOrders();
});


function getOrders(){

let html="";

fetch(API)
.then(res=>res.json())
.then(data=>{

data.forEach(order=>{

html+=`
<tr>

<td>${order.id}</td>
<td>${order.customer_name}</td>
<td>${order.pizza_type}</td>
<td>${order.size}</td>
<td>${order.quantity}</td>
<td>${order.instructions}</td>

<td>

<div class="actions">

<i class="fas fa-edit" onclick="editOrder(${order.id})"></i>

<i class="fas fa-trash" onclick="deleteOrder(${order.id})"></i>

</div>

</td>

</tr>
`;

});

content.innerHTML=html;

updateStats();

});

}


function deleteOrder(id){

if(confirm("Delete this order?")){

fetch(`${API}/${id}`,{
method:"DELETE"
})
.then(()=>location.reload());

}

}


function editOrder(id){

fetch(`${API}/${id}`)
.then(res=>res.json())
.then(order=>{

document.querySelector("#customer").value=order.customer_name;
document.querySelector("#pizzaType").value=order.pizza_type;
document.querySelector("#pizzaSize").value=order.size;
document.querySelector("#quantity").value=order.quantity;
document.querySelector("#instructions").value=order.instructions;
document.querySelector("#orderID").value=order.id;

});

}


update.addEventListener("click",()=>{

let id=document.querySelector("#orderID").value;

let customer_name=document.querySelector("#customer").value;
let pizza_type=document.querySelector("#pizzaType").value;
let size=document.querySelector("#pizzaSize").value;
let quantity=document.querySelector("#quantity").value;
let instructions=document.querySelector("#instructions").value;

let formData={customer_name,pizza_type,size,quantity,instructions};

fetch(`${API}/${id}`,{
method:"PUT",
body:JSON.stringify(formData),
headers:{ "Content-Type":"application/json"}
});

alert("Order Updated");
location.reload();

});


// SEARCH

document.querySelector("#searchBar").addEventListener("keyup",function(){

let filter=this.value.toLowerCase();
let rows=document.querySelectorAll("#tableBody tr");

rows.forEach(row=>{

let name=row.children[1].textContent.toLowerCase();

if(name.includes(filter)){
row.style.display="";
}else{
row.style.display="none";
}

});

});


// ORDER COUNTER

function updateStats(){

let rows=document.querySelectorAll("#tableBody tr");

document.querySelector("#totalOrders").innerText=rows.length;

}
