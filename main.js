console.log('js')
fetch("https://randomuser.me/api/?results=10") 
.then(function(para){ 
return para.json(); 

}) 

.then(function(json){ 
    let users = json.results;
    for(user of users){
        makeUser(user);
    }
})

function makeUser(user){
    let card = document.createElement("div"); 
    let pic = document.createElement("img"); 
    pic.src = user.picture.thumbnail; 
    card.appendChild(pic); 
    let names = document.createElement("p"); 
    names.innerText = user.name.first + user.name.last; 
    card.appendChild(names);
    let input = document.createElement("input");
    input.placeholder = "hit me up";
    card.appendChild(input);
    let button = document.createElement("button"); 
    button.innerText = "Send"; 
    card.appendChild(button);
    document.getElementById("friends").appendChild(card); 
}


const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
const database =firebase.database().ref()

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    const data={ 
        USERNAME: username, 
        MESSAGE: message, 

    } 
    database.push(data);
}

// Set database "child_added" event listener here 

database.on("child_added",addMessage);

function addMessage(rowData){ 
    const row = rowData.val(); 
    const name= row.USERNAME; 
    const msg= row.MESSAGE;
    let messagediv = document.getElementsByClassName("userContainer")[0]; 
    console.log(messagediv);
    let para= document.createElement("p") 
    para.innerText=`${name}: ${msg}`;
    messagediv.appendChild(para);
}