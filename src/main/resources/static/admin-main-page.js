let url = "http://localhost:7070/api";
showAll();

function getAll() {
    return fetch(url + "/users");
}

function getUser() {
    return fetch(url + "/profile").then(response => response.json());
}

function getUserById(id) {
    return fetch(url + "/users/" + id ).then(response => response.json());
}
getUser().then(data => {
    $("#navbarUserInfo").append(data.name + " " + data.userRoles[0].roleName);
    let info = `$(
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.age}</td>
                        <td>${data.email}</td>
                        <td>${data.userRoles[0].roleName}</td>
                     )`
    $("#adminInfo").append(info);
});


function showAll() {
    $("#userTable").empty();
    getAll().then(response => response.json()).then(data => data.forEach(user => {

        let userRow = `$(
        <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.userRoles[0].roleName}</td>
         <td>
            <button type="button" class="btn btn-warning" data-bs-toogle="modal"
            data-bs-target="#editModal" onclick="editModalData(${user.id})">Edit</button>
        </td> 
        <td>
            <button type="button" class="btn btn-dark" data-bs-toogle="modal"
            data-bs-target="#deleteModel" onclick="deleteModalData(${user.id})">Delete</button>
        </td>                                 
        </tr>
    )`

        $("#userTable").append(userRow);
    }))
}


function openModal(nameForm, nameModal, id) {
    const formData = document.getElementById(nameForm);
    const modal = new bootstrap.Modal(document.querySelector(nameModal))
    modal.show();
    getUserById(id).then(data => {
        formData.id.value=data.id;
        formData.name.value=data.name;
        formData.email.value=data.email;
        formData.age.value=data.age;
        formData.password.value=data.password;
        formData.roles.value=data.userRoles[0].roleName;
    })
    return formData;
}
function deleteModalData(id) {
    openModal("formDeleteUser", "#deleteModal", id)
        .addEventListener("submit", e => {
        e.preventDefault();
        fetch(url + `/users/${id}` , {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(() => {
            $('#deleteFormCloseButton').click();
            showAll();
        })
    })
}

function editModalData(id) {
    const formData = openModal("formEditUser", "#editModal", id)
    formData.addEventListener("submit", e => {
        e.preventDefault();
        const valueFromForm = new FormData(formData);
        fetch(url + "/users/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "id": valueFromForm.get("id"),
                    "name": valueFromForm.get("name"),
                    "password": valueFromForm.get("password"),
                    "email": valueFromForm.get("email"),
                    "age": valueFromForm.get("age"),
                    "userRoles": [{
                        "roleName": valueFromForm.get("roles")
                    }]
                }
            )
        }).then(() => {
            $('#editFormCloseButton').click();
            showAll();
        })
    })
}