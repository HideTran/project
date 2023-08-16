if(localStorage.getItem("userLogin")) {
    alert("Bạn đã đăng nhập!")
    window.location.href='/'
}

const validate = {
    isEmail: function (emailString) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
    }
}

function login(event) {
    event.preventDefault();
    let infor = {
        email: event.target.email.value,
        password: event.target.password.value,
    }
    if (!(validate.isEmail(event.target.email.value))) {
        alert("Email không đúng định dạng!")
        return;
    }
    if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users"));

        let user = users.find(user => user.email == infor.email);

        if(user) {
            if (user.password == infor.password) {
                // login thành công!
                localStorage.setItem("userLogin", user.id)
                alert("Bạn đã đăng nhập thành công!")
                window.location.href='/index.html'
            }else {
                alert("Mật khẩu không chính xác!")
            }
        }else {
            alert("Người dùng không tồn tại!")
        }
    }else {
        alert("Sever bận!")
    }

}