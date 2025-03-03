sessionStorage.getItem("id")
const getDataFromRegister = () => {
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password2").value
    const firstname = document.querySelector("#firstname").value
    const lastname = document.querySelector("#lastname").value
    return { username, password, firstname, lastname }
}
const getDataFromUpdate = () => {
    const username = document.querySelector("#usernameOnUpdate").value
    const password = document.querySelector("#passwordOnUpdate").value
    const firstname = document.querySelector("#firstnameOnUpdate").value
    const lastname = document.querySelector("#lastnameOnUpdate").value
    const userId = sessionStorage.getItem("id");
    return { userId, username, password, firstname, lastname }
}
const getDataFromLogin = () => {
    const username = document.querySelector("#nameInput").value
    const password = document.querySelector("#passwordInput").value
    const firstname = "no-name"
    const lastname = "no-name"
    return { username, password, firstname, lastname }
}
const login = async () => {
    const user = getDataFromLogin()
    //add a validation for email field
    try {
        const data = await fetch(`api/Users/login/?username=${user.username}&password=${user.password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            query: {
                username: user.username,
                password: user.password
            }
        });
        if (data.status == 204) {
            throw new Error("user not found")
        }
        if (data.status == 400) {
            throw new Error("all fields are required")
        }
        console.log(data)
        const dataLogin = await data.json()
        console.log('post data',dataLogin)
        //sessionStorage
        sessionStorage.setItem("id", dataLogin.userId)
        window.location.href = 'userDetails.html'
    }
    catch (error) {
        console.log(error)
        alert(error)
    }
    
}
const newUser = () => {
    const container = document.querySelector(".container")
    container.classList.remove("container")
}

const seeTheUpdateUser = () => {
    const container = document.querySelector(".containerOfUpdate")
    container.classList.remove("containerOfUpdate")
}

const register = async () => {
    const user = getDataFromRegister()
    console.log(user.password.length)
    try {
        if (user.password.length > 20 || user.password.length < 5) {
            throw new Error("the password must be between 5 to 20")
        }
        const postFromData = await fetch("api/Users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (postFromData.status == 400) {
            throw new Error("all fields are required")
        }
        if (postProgress.status === 404) {
            alert("password not good!!!")
        }
        const dataPost = await postFromData.json()
        console.log('post data', dataPost)
    }
    catch (error) {
        alert(error)
    }
}
const updateUser = async () => {
    console.log(sessionStorage.getItem("id"))
    const user = getDataFromUpdate()
    try {
        console.log(sessionStorage.getItem("id"))
        const updateFromData = await fetch(`api/Users/${sessionStorage.getItem("id")}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (updateFromData.status == 400) {
            throw new Error("all fields are required")
        }
        alert(`user ${sessionStorage.getItem("id")} update`)
    }
    catch (error) {
        alert(error)
    }
}
const CheckPassword = async () => {
    const progress = document.querySelector("#progress")
    const password2 = document.querySelector("#password2").value
    try {
        const postProgress = await fetch("api/Users/CheckPassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password2)
        });
        if (postProgress.status === 400) {
            throw new Error("all fields are required")
        }
       
        const data = await postProgress.json();
        console.log(data)
        progress.value = data
    } catch (error) {
       console.log(error)
    }
}