const submit = document.querySelector("#add");
const update = document.querySelector("#update");
const content = document.querySelector("#tableBody");
const API = "https://sfbackend-uwjg.onrender.com/api/orders";


update.style.display = "none"; // 

window.addEventListener("load", () => loadOrders());

// ─── LOAD ORDERS ───
function loadOrders() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            content.innerHTML = data.map(order => `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.pizza_type}</td>
                    <td>${order.size}</td>
                    <td>${order.quantity}</td>
                    <td>${order.instructions}</td>
                    <td>
                        <div class="actions">
                            <a href="javascript:void(0)" onclick="editOrder(${order.id})">
                                <i class="fas fa-edit"></i>
                            </a>
                            <a href="javascript:void(0)" onclick="deleteOrder(${order.id})">
                                <i class="fas fa-trash"></i>
                            </a>
                        </div>
                    </td>
                </tr>
            `).join('');
        })
        .catch(err => console.error("Error fetching orders:", err));
}

// ─── GET FORM DATA ───
function getFormData() {
    const customer_name = document.querySelector("#customer").value.trim();
    const pizza_type = document.querySelector("#pizzaType").value;
    const size = document.querySelector("#pizzaSize").value;
    const quantity = parseInt(document.querySelector("#quantity").value);
    const instructions = document.querySelector("#instructions").value.trim();

    if (!customer_name || !pizza_type || !size || isNaN(quantity) || quantity <= 0) {
        alert("Please fill all required fields correctly.");
        return null;
    }

    return { customer_name, pizza_type, size, quantity, instructions };
}

// ─── ADD ORDER ───
submit.addEventListener("click", () => {
    const data = getFormData();
    if (!data) return;

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(() => {
        clearForm();
        loadOrders();
        alert("Order added successfully!");
    })
    .catch(err => console.error(err));
});

// ─── DELETE ORDER ───
function deleteOrder(id) {
    if (!confirm("Delete this order?")) return;

    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(() => loadOrders())
        .catch(err => console.error(err));
}

// ─── EDIT ORDER ───
function editOrder(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(order => {
            document.querySelector("#customer").value = order.customer_name;
            document.querySelector("#pizzaType").value = order.pizza_type;
            document.querySelector("#pizzaSize").value = order.size;
            document.querySelector("#quantity").value = order.quantity;
            document.querySelector("#instructions").value = order.instructions;
            document.querySelector("#orderID").value = order.id;

            submit.style.display = "none";
            update.style.display = "inline-block";
        })
        .catch(err => console.error(err));
}

// ─── UPDATE ORDER ───
update.addEventListener("click", () => {
    const id = document.querySelector("#orderID").value;
    const data = getFormData();
    if (!data) return;

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(() => {
        clearForm();
        loadOrders();
        submit.style.display = "inline-block";
        update.style.display = "none";
        alert("Order updated successfully!");
    })
    .catch(err => console.error(err));
});

// ─── CLEAR FORM ───
function clearForm() {
    document.querySelector("#customer").value = "";
    document.querySelector("#pizzaType").value = "Margherita";
    document.querySelector("#pizzaSize").value = "Small";
    document.querySelector("#quantity").value = "";
    document.querySelector("#instructions").value = "";
    document.querySelector("#orderID").value = "";
}
