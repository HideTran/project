function checkLogin(){
    let login= document.getElementsByClassName("login")[0];
    let logout = document.getElementsByClassName("logout")[0];
    let register = document.getElementsByClassName("register")[0];
    let user = document.getElementsByClassName("user")[0];
    if (localStorage.getItem("userLogin")) {
        login.style.display="none";
        register.style.display="none";
        logout.style.display="block";
        user.style.display="block";
        user.innerText =`Xin chào ` + JSON.parse(localStorage.getItem("userLogin")).email;
    }else {
        login.style.display="block";
        register.style.display="block";
        logout.style.display="none";
        user.style.display="none";
    }
}
checkLogin();

function logout(){
    if (confirm("Bạn muốn đăng xuất")){
        localStorage.removeItem("login")
        window.location.href="./index.html";
    }
}

function renderTableData(productList) {
    let tableDataString = ``;

    for (let i = 0; i <= productList.length; i++) {
        tableDataString += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>
                    <img style="width: 50px; height: 50px; border-radius: 50%;" src="${productList[i].image}" >
                </td>
                <td>${productList[i].category}</td>
                <td>
                    <button onclick="updateItem(${productList[i].id}, '-')">-</button>
                    ${productList[i].quantity}
                    <button onclick="updateItem(${productList[i].id}, '+')">+</button>
                </td>
                <td>${productList[i].quantity * productList[i].price }</td>
                <td><button onclick="deleteItem(${productList[i].id})" type="button" class="btn btn-danger">Delete</button></td>
            </tr>
        `
    }

    tableDataString += `
            <tr>
                <th scope="row"></th>
                <td>Tổng Cộng</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${productList.reduce((result, nextItem) => {
                    return result += (nextItem.quantity * nextItem.price)
                }, 0)}</td>
                <td></td>
            </tr>
        `
    document.getElementById("table_data").innerHTML = tableDataString;
}

renderTableData(JSON.parse(localStorage.getItem("userLogin")).carts)

function deleteItem(itemID) {
    if (!confirm("Bạn muốn xóa sản phẩm này?")) {
        return;
    }
    let login = JSON.parse(localStorage.getItem("login"));
    let userCart = login.cart;
    login.cart = userCart.filter(item => item.id != itemID);


    localStorage.setItem("login", JSON.stringify(userLogin));

    let users = JSON.parse(localStorage.getItem("users"))
    users = users.map(user => {
        if (user.id == login.id) {
            return login
        }
        return user
    })
    localStorage.setItem("users", JSON.stringify(users));
    renderTableData(JSON.parse(localStorage.getItem("userLogin")).carts)

}

function updateItem(itemID, type) {
    let userLogin = JSON.parse(localStorage.getItem("login"));
    let userCart = userLogin.cart;
    if (type == '-') {
        for (let i = 0; i < userCart.length; i++) {
            if (userCart[i].id == itemID) {

                if (userCart[i].quantity == 1) {
                    deleteItem(itemID);
                    return;

                } else {
                    userCart[i].quantity -= 1;
                }
                break;

            }
        } 
    }else{
            for (let i = 0; i < userCart.length; i++) {
                if (userCart[i].id == itemID) {
                    userCart[i].quantity += 1;
                    break;
                }
            }

        }
    

    localStorage.setItem("login", JSON.stringify(userLogin));

    let users = JSON.parse(localStorage.getItem("users"));
    users = users.map(user => {
        if (user.id == userLogin.id) {
            return userLogin
        }
        return user
    })
    localStorage.setItem("users", JSON.stringify(users));
    renderTableData(JSON.parse(localStorage.getItem("userLogin")).carts)
}
