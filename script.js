const submit = document.querySelector("#add");
const update = document.querySelector("#update");
const content = document.querySelector("#tableBody");

const API = "https://sfbackend-uwjg.onrender.com/api/orders";

// ─── ADD ORDER ───
submit.addEventListener("click", () => {

    let customer_name = document.querySelector("#customer").value;
    let pizza_type = document.querySelector("#pizzaType").value;
    let size = document.querySelector("#pizzaSize").value;
    let quantity = document.querySelector("#quantity").value;
    let instructions = document.querySelector("#instructions").value;

    let formData = { customer_name, pizza_type, size, quantity, instructions };

    fetch(API, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(() => {
        alert("Order Added Successfully");
        location.reload();
    })
    .catch(error => console.log(error));
});


// ─── LOAD ORDERS ───
window.addEventListener("load", () => {
    getOrders();
});

function getOrders() {

    let html = "";

    fetch(API)
    .then(response => response.json())
    .then(data => {

        data.forEach(order => {

            html += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer_name}</td>
                <td>${order.pizza_type}</td>
                <td>${order.size}</td>
                <td>${order.quantity}</td>
                <td>${order.instructions}</td>
                <td>
                    <div class="actions">
                        <a class="btn-update" href="javascript:void(0)" onclick="editOrder(${order.id})">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a class="btn-delete" href="javascript:void(0)" onclick="deleteOrder(${order.id})">
                            <i class="fas fa-trash"></i>
                        </a>
                    </div>
                </td>
            </tr>
            `;

        });

        content.innerHTML = html;

    })
    .catch(error => console.log(error));
}


// ─── DELETE ORDER ───
function deleteOrder(id) {

    if (confirm("Delete this order?")) {

        fetch(API, {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(() => location.reload())
        .catch(error => console.log(error));
    }
}


// ─── SEARCH ORDER FOR UPDATE ───
function editOrder(id){

    fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(data => {

        document.querySelector("#customer").value = data.customer_name;
        document.querySelector("#pizzaType").value = data.pizza_type;
        document.querySelector("#pizzaSize").value = data.size;
        document.querySelector("#quantity").value = data.quantity;
        document.querySelector("#instructions").value = data.instructions;
        document.querySelector("#orderID").value = data.id;

    });
}


// ─── UPDATE ORDER ───
update.addEventListener("click", () => {

    let id = document.querySelector("#orderID").value;
    let customer_name = document.querySelector("#customer").value;
    let pizza_type = document.querySelector("#pizzaType").value;
    let size = document.querySelector("#pizzaSize").value;
    let quantity = document.querySelector("#quantity").value;
    let instructions = document.querySelector("#instructions").value;

    let formData = { id, customer_name, pizza_type, size, quantity, instructions };

    fetch(API, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(() => {
        alert("Order Updated Successfully");
        location.reload();
    })
    .catch(error => console.log(error));
});