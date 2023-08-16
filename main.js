let category=["Kawasaki","Ducati","Yamaha"]
let products= [
    {
        id: Date.now() * Math.random(),
        name:"Kawasaki Z1000",
        category: [category[0]],
        price: "460000000",
        quantity:1,
        image: "./img/z1000.png",
    },
    {
        id: Date.now() * Math.random(),
        name:"Kawasaki Z400",
        category: [category[0]],
        price: "150000000",
        quantity:1,
        image: "./img/z400.png",
    },
    {
        id: Date.now() * Math.random(),
        name:"Kawasaki ZX25R",
        category: [category[0]],
        price: "155000000",
        quantity:1,
        image: "./img/zx25r.png",
    },
    {
        id: Date.now() * Math.random(),
        name:"Ducati Monster",
        category: [category[1]],
        price: "425000000",
        quantity:1,
        image: "./img/monster.png",
    },
    {
        id: Date.now() * Math.random(),
        name:"Ducati Scrambler",
        category: [category[1]],
        price: "410000000",
        quantity:1,
        image: "./img/scrambler.png",
    },
    {
        id: Date.now() * Math.random(),
        name:"Ducati Diavel",
        category: [category[1]],
        price: "850000000",
        quantity:1,
        image: "./img/diavel.png",
    },
    {
        id: Date.now() * Math.random(),
        name:"Yamaha XSR155",
        category: [category[2]],
        price: "77000000",
        quantity:1,
        image: "./img/xsr155.png",
    },
    {
        id: Date.now() * Math.random(),
        name:"Yamaha R3",
        category: [category[2]],
        price: "98000000",
        quantity:1,
        image: "./img/r3.png",
    },
    {
        id: Date.now() * Math.random(),
        name:"Yamaha MT03",
        category: [category[2]],
        price: "132000000",
        quantity:1,
        image: "./img/mt03.png",
    }
]
localStorage.setItem("products", JSON.stringify(products))


function saveToLocal() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users))
    }
}

saveToLocal();


function renderTableData(productList) {
    let tableDataString = ``;

    for (let i = 0; i < productList.length; i++) {
        tableDataString += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>
                    <img style="width: 50px; height: 50px; border-radius: 50%;" src="${productList[i].image}" >
                </td>
                <td>${productList[i].category}</td>
                <td><button onclick="buyItem(${productList[i].id})" type="button" class="btn btn-danger">Mua</button></td>
            </tr>
        `
    }
    document.getElementById("table_data").innerHTML = tableDataString;
}


renderTableData(JSON.parse(localStorage.getItem("products")));


const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

function logout(){
    if (confirm("Bạn chắc chắn muốn đăng xuất?")){
        localStorage.removeItem("userLogin")
        window.location.reload();
    }
}

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


function removeAccentLowerCase(str) {
    return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

function searchByInfo(event) {
    let productCopy = [...JSON.parse(localStorage.getItem("products"))];
    productCopy = productCopy.filter(product => removeAccentLowerCase(product.name + product.price + product.category).includes(removeAccentLowerCase(event.target.value)));
    renderTableData(productCopy);
}

function getProductById(productId) {
    return JSON.parse(localStorage.getItem("products")).find(product => product.id == productId);
}

function buyItem(productId) {
    let userLogin = localStorage.getItem("userLogin");
    if(userLogin) {
        userLogin = JSON.parse(userLogin);
        let itemIncart = userLogin.carts.find(item => item.id == productId);
        if(itemIncart) {
            itemIncart.quantity += 1;

            let carts = userLogin.carts.map(item => {
                if(item.id == itemIncart.id) {
                    return itemIncart
                }
                return item
            })
            userLogin.carts = carts;

            localStorage.setItem("userLogin", JSON.stringify(userLogin))
            let users = JSON.parse(localStorage.getItem("users"));
            users = users.map(user => {
                if(user.id == userLogin.id) {
                    return userLogin
                }
                return user
            })
            localStorage.setItem("users", JSON.stringify(users))

        }else {
            let product = getProductById(productId);
            product.quantity = 1;
            userLogin.carts.push(product)
            //save to local
            localStorage.setItem("userLogin", JSON.stringify(userLogin))
            
            let users = JSON.parse(localStorage.getItem("users"));

            users = users.map(user => {
                if(user.id == userLogin.id) {
                    return userLogin
                }
                return user
            })
            localStorage.setItem("users", JSON.stringify(users))
        }
    }else {
       alert("Bạn cần đăng nhập để mua hàng!")
    }
}

if(localStorage.getItem(JSON.parse(localStorage.getItem("userLogin")))) {
    document.getElementById("userLogin").innerText = "User đang login: " + userLogin.email;
}
function toCart(){
    if (JSON.parse(localStorage.getItem("userLogin"))) {
        window.location.href="./cart.html"
        return;
    }
    alert("Bạn phải đăng nhập!");
}

let flag = false;
function sortByPrice() {
    let products = JSON.parse(localStorage.getItem("products"));
    if (flag) {
        products.sort((a, b) => a.price - b.price);
    }else {
        products.sort((a, b) => b.price - a.price);
    }
    flag = !flag;
    renderTableData(products);
}