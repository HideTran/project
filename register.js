if (localStorage.getItem("userLogin")) {
    alert("Bạn đã đăng nhập!")
    window.location.href = '/index.html'
}

const validate = {
    isEmail: function (emailString) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
    }
}

function register(event) {
    event.preventDefault();
    if (!(validate.isEmail(event.target.email.value))) {
        alert("Email không đúng định dạng!")
        return;
    }
    if (event.target.password.value != event.target.confirm_password.value) {
        alert("Mật khẩu và mật khẩu nhập lại phải giống nhau!")
        return;
    }
    if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users"));
        if (users.find(user => user.email == event.target.email.value)) {
            alert("Email đã tồn tại!")
            return;
        }
        users.push(
            {
                id: Date.now() * Math.random(),
                email: event.target.email.value,
                password: event.target.password.value,
                phone_number: event.target.phone_number.value,
                address: event.target.address.value,
            }
        )
        localStorage.setItem("users", JSON.stringify(users))
        alert("Đăng ký thành công")
        window.location.href = "./login.html"
    } else {
        localStorage.setItem("users", JSON.stringify([
            {
                id: Date.now() * Math.random(),
                email: event.target.email.value,
                password: event.target.password.value,
                phone_number: event.target.phone_number.value,
                address: event.target.address.value,
            }
        ]))
        alert("Đăng ký thành công")
        window.location.href = "./login.html"
    }
}
