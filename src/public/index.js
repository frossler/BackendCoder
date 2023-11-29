const socketClient = io();

// REAL TIME PRODUCTS

const realTimeProductsView = document.getElementById("realTime-container");

if (realTimeProductsView) {

    console.log("real time view");

    const form = document.getElementById("form");
    const inputName = document.getElementById("title");
    const inputDescription = document.getElementById("description");
    const inputCode = document.getElementById("code");
    const inputPrice = document.getElementById("price");
    const inputStock = document.getElementById("stock");
    const inputCategory = document.getElementById("category");
    const inputStatus = document.getElementById("status");
    const inputThumbnails = document.getElementById("thumbnails");

    const products = document.getElementById("products");

    form.onsubmit = (e) => {
        e.preventDefault();
        const title = inputName.value;
        const description = inputDescription.value;
        const code = inputCode.value;
        const price = inputPrice.value;
        const stock = inputStock.value;
        const category = inputCategory.value;
        const status = inputStatus.value;
        const thumbnails = inputThumbnails.value;

        const product = {
            title,
            description,
            price,
            code,
            stock,
            category,
            status,
            thumbnails
        };
        socketClient.emit("newProduct", product);

        inputName.value = "";
        inputDescription.value = "";
        inputCode.value = "";
        inputPrice.value = "";
        inputStock.value = "";
        inputCategory.value = "";
        inputStatus.value = "";
        inputThumbnails.value = ""
    };

socketClient.on("arrayProducts", (arrayProducts) => {
    let newProductsHtml = '';

    arrayProducts.forEach((element) => {
        const thumbnails = element.thumbnails.map(thumbnail => `<img src=${thumbnail} style="width: 50px;"></img>`).join('');
        const boxItem = `
            <div class="product">
              <h3>${element.title}</h3>
              ${thumbnails}
              <p>Code: ${element.code}</p>
              <p>Description: ${element.description}</p>
              <p>ID: ${element.id}</p>
              <p>$ ${element.price}</p>
            </div>`;
        newProductsHtml += boxItem;
    });
    products.innerHTML = newProductsHtml;
});
};

// CHAT

const chatView = document.getElementById("chat-container");

if (chatView) {
    console.log("Chat Log");
    let username = null;
    if (!username) {
        Swal.fire({
            title: "Chat App",
            text: "Enter your username",
            input: "text",
            inputValidator: (value) => {
                if (!value) return "Enter your Username";
            },
        }).then((input) => {
            username = input.value;
            socketClient.emit("newUser", username);
        });
    }

    const message = document.getElementById("message");
    const btn = document.getElementById("send");
    const output = document.getElementById("output");
    const actions = document.getElementById("actions");     

    btn.addEventListener("click", () => {
        socketClient.emit("chat:message", {
            username,
            message: message.value,
        });
        message.value = "";
    });

    socketClient.on("messages", (data) => {
        actions.innerHTML = "";
        const chatRender = data
            .map((msg) => {
                return `<p><strong> ${msg.username} </strong>: ${msg.message} </p>`;
            })
            .join(" ");
        output.innerHTML = chatRender;
    });

    socketClient.on("newUser", (username) => {
        Toastify({
            text: `${username} has logged in.`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    });

    message.addEventListener("keypress", () => {
        socketClient.emit("chat:typing", username);
    });

    socketClient.on("chat:typing", (user) => {
        actions.innerHTML = `<p>${user} is writing a message...</p>`;
    });
}
