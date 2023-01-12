let saveurl = "http://localhost:7070/api/saveuser";


const formElement = document.getElementById("addForm");

formElement.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(formElement);
    let userRoles = [];
    for(let i = 0; i < formElement.userRoles.options.length; i++) {
        if (formElement.userRoles.options[i].selected) userRoles.push({
            "roleName" : formElement.userRoles.options[i].value
        })
    }
    fetch(saveurl, {
        method: "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {
                "name" : formData.get("name"),
                "password" : formData.get("password"),
                "email" : formData.get("email"),
                "age" : formData.get("age"),
                "userRoles" : userRoles
            }
        )
    }).then(() => {
        $("#home-tab").click();
        showAll();
    })
})