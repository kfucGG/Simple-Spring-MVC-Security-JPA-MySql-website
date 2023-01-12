let url = "http://localhost:7070/api";
showAll();

function getAll() {
    return fetch(url + "/users", {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

function getUser() {
    return fetch(url + "/profile").then(response => response.json());
}

function getUserById(id) {
    return fetch(url + "/users/" + id ).then(response => response.json());
}
getUser().then(data => {
    $("#navbarUserInfo").append(data.name + " " + data.userRoles.map(role => " " + role.roleName));
    let info = `$(
                        <td>${data.id}</td>
                        <td>${data.name}</td>
                        <td>${data.age}</td>
                        <td>${data.email}</td>
                        <td>${data.userRoles.map(role => " " + role.roleName)}</td>
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
        <td>${user.userRoles.map(role => " " + role.roleName)}</td>
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



