let saveurl = "http://localhost:8080/api/saveuser";

const formElement = document.getElementById("addForm");
formElement.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(formElement);
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
                "userRoles" : [{
                    "roleName" : formData.get("userRoles")
                }]
            }
        )
    }).then(() => {
        $("#home-tab").click();
        showAll();
    })
})