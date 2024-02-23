var whole = "";
var textc = ["encription value: "];
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
document.addEventListener('keydown', function(event) {
  console.log("Key pressed: " + event.key + ", ASCII value: " + event.keyCode);
  textc.push(event.keyCode);
  document.getElementById("msg").innerHTML = textc;
  if(event.keyCode == 8){
    document.getElementById("msg").innerHTML = '';
    textc = [];
  }
});


  firebase.initializeApp(firebaseConfig);
    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

function send()
{
  msg = textc
  firebase.database().ref(room_name).push({
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").innerHTML = "";
  textc = ["encription value: "];
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
         console.log(firebase_message_id);
           console.log(message_data);
           name = message_data['name'];
           console.log(message_data['message'].length);
           console.log(message_data['message']);
            for(i = 1; i < message_data['message'].length; i++){
              whole = whole + String.fromCharCode((message_data['message'])[i]);
              console.log(String.fromCharCode(('['+message_data['message']+']')[i]));
            }


            console.log(whole);


           message = whole.toLowerCase();
           whole = "";
         like = message_data['like'];
         name_with_tag = "<h4> "+ name + ":";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+ like +"</span></button><hr>";

        row = name_with_tag + message_with_tag +like_button + span_with_tag;  
        document.getElementById("title").innerHTML = "msg: "+ name + ": " + message;
        document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like : updated_likes  
     });

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}