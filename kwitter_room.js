const firebaseConfig = {
  apiKey: "AIzaSyDmBIYewqElP9q8GSE8kHq3d2umL1iermQ",
  authDomain: "chat-5be71.firebaseapp.com",
  databaseURL: "https://chat-5be71-default-rtdb.firebaseio.com",
  projectId: "chat-5be71",
  storageBucket: "chat-5be71.appspot.com",
  messagingSenderId: "1053630910965",
  appId: "1:1053630910965:web:deccc9223944e35fa550bc",
  measurementId: "G-HF6QRKXDFJ"
};



  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}
