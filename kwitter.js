function adduser() {

    name1 = document.getElementById("user_name").value;
    localStorage.setItem("name", name1);
    window.location = "kwitter_room.html";
}