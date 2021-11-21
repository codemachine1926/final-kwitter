const firebaseConfig = {
    apiKey: "AIzaSyB1eerxpewmSwOoKQrrse858CetnxmyNqo",
    authDomain: "kwitter-project-e5f00.firebaseapp.com",
    databaseURL: "https://kwitter-project-e5f00-default-rtdb.firebaseio.com",
    projectId: "kwitter-project-e5f00",
    storageBucket: "kwitter-project-e5f00.appspot.com",
    messagingSenderId: "543489636143",
    appId: "1:543489636143:web:a06a48b27a4628aa3553da"
  };
  
  firebase.initializeApp(firebaseConfig);

  name1 = localStorage.getItem("name1");
  document.getElementById("user_name").innerHTML = "WELCOME  " + name1 + "!";
  
  function add_room() {
  
        room_name = document.getElementById("room_name").value;
        firebase.database().ref("/").child(room_name).update(
              {
                    purpose: "add room name"
              });
        localStorage.setItem("room_name", room_name);
        document.getElementById("room_name").value = "";
        window.location("kwitter_page.html");
  }
  
  function getData() {
  
        firebase.database().ref("/").on('value', function (snapshot) {
              document.getElementById("output").innerHTML = "";
              snapshot.forEach(function (childSnapshot) {
                    childKey = childSnapshot.key;
                    Room_names = childKey;
                    console.log("room - " + Room_names);
                    row = "<div class='room_name' id= " + Room_names + " onclick= 'redirect_to_room_name(this.id)'> " + Room_names + "</div> <hr>";
                    document.getElementById("output").innerHTML += row;
              });
        });
  }
  getData();
  
  function redirect_to_room_name(name) {
  
        console.log(name);
        localStorage.setItem("room-name", name);
        window.location = "kwitter_page.html";
  }
  
  function logout() {
  
        window.location = "index.html";
        localStorage.removeItem("room_name");
        localStorage.removeItem("name1");
  }
  
  