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
  user_name = localStorage.getItem("name1");
room_name = localStorage.getItem("room_name");

function send() {

      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            like: 0,
            message: msg,
            name: user_name
      });
      document.getElementById("msg").value = "";
}

function getData() {

      firebase.database().ref("/" + room_name).on('value',
            function (snapshot) {
                  document.getElementById("output").innerHTML = "";
                  snapshot.forEach(function (childSnapshot) {
                        childKey = childSnapshot.key;
                        childData = childSnapshot.val();
                        if (childKey != "purpose") {
                              firebase_message_id = childKey;
                              message_data = childData;

                              console.log(firebase_message_id);
                              console.log(message_data);

                              name = message_data["name1"];
                              message = message_data["message"];
                              like = message_data["like"];
                              name_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                              message_tag = "<br><h4 class='message_h4'>" + message + "</h4><br>";
                              like_tag = "<button class='btn btn-warning' id=" + firebase_message_id + " value = " + like + " onclick='update_like(this.id)'>";
                              span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
                              row = name_tag + message_tag + like_tag + span_tag;
                              document.getElementById("output").innerHTML += row;
                        }
                  });
            });
}
getData();

function update_like(message_id) {

      like_value = document.getElementById(message_id).value;
      updated_likes = Number(like_value) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({

            like: updated_likes
      });
}

function logout() {

      window.location = "index.html";
      localStorage.removeItem("name1");
      localStorage.removeItem("room_name");
}