let url = "http://localhost:7070/api/profile";
function getUser() {
    return fetch(url).then(response => response.json());
}

getUser().then(data => {
    $("#headerInfo").append(data.name + " " + data.userRoles[0].roleName);
});

getUser().then(data => {
    let userInfo = `$(
        <tr>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${data.email}</td>
            <td>${data.userRoles[0].roleName}</td>
        </tr>
    )`
    $("#userTable").append(userInfo);
})