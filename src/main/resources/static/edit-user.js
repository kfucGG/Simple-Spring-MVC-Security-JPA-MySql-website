let formData = document.forms['formEditUser']
editUser()


function editModalData(id) {
    openModal("formEditUser", "#editModal", id)
}
function editUser() {
    formData.addEventListener("submit", e => {
        e.preventDefault();
        const valueFromForm = new FormData(formData);
        let userRoles = [];
        for(let i = 0; i < formData.roles.options.length; i++) {
            if (formData.roles.options[i].selected) userRoles.push({
                "roleName" : formData.roles.options[i].value
            })
        }
        fetch(url + "/users/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "id": valueFromForm.get("id"),
                    "name": valueFromForm.get("name"),
                    "password": valueFromForm.get("password"),
                    "email": valueFromForm.get("email"),
                    "age": valueFromForm.get("age"),
                    "userRoles": userRoles
                }
            )
        }).then(() => {
            $('#editFormCloseButton').click();
            showAll();
        })
    })
}