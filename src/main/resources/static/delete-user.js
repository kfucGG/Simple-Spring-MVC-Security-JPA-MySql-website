let deleteForm = document.forms["formDeleteUser"]
deleteUser();


function deleteModalData(id) {
    openModal("formDeleteUser", "#deleteModal", id)
}
function deleteUser() {

        deleteForm.addEventListener("submit", e => {
            e.preventDefault();
            fetch(url + `/users/${deleteForm.id.value}` , {
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