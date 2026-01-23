console.log("client.js excuting");

const socket = io();
let roomUniqueId = null;
let player1 = false;

function createGame() {
    player1 = true;
    socket.emit('createGame');
}

function joinGame() {
    roomUniqueId = document.getElementById('roomUniqueId').value;
    socket.emit('joinGame', {roomUniqueId: roomUniqueId});
}

socket.on("newGame", (data) => {
    roomUniqueId = data.roomUniqueId;
    document.getElementById('initial').style.display = 'none';
    document.getElementById('gamePlay').style.display = 'block';
    let copyButton = document.createElement('button');
    copyButton.innerText = 'Copy Code';
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(roomUniqueId).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    });
    document.getElementById('waitingArea').innerHTML = `Waiting for opponent, please share code ${roomUniqueId} to join`;
    document.getElementById('waitingArea').appendChild(copyButton);
});

socket.on("playersConnected", () => {
    document.getElementById('initial').style.display = 'none';
    document.getElementById('waitingArea').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
})

socket.on("p1Choice", (data) => {
    if (!player1) {
       createOpponentChoiceButton(data);
    }
});

socket.on("p2Choice", (data) => {
    if (player1) {
       createOpponentChoiceButton(data);
    }
});

<<<<<<< HEAD
socket.on("result", (data) => {
    let winnerText = '';
    if (data.winner != 'd'){
        if (data.winner == 'p1' && player1){
            winnerText = 'You win';
        }
        else if (data.winner == 'p1'){
            winnerText = 'You lose';
        }
        else if (data.winner == 'p2' && !player1){
            winnerText = 'You win';
        }
        else if (data.winner == 'p2'){
            winnerText = 'You lose';
        }
    }
    else {
        winnerText = 'DRAW';
    }
    document.getElementById('opponentState').style.display = 'none';
    document.getElementById('opponentButton').style.display = 'block';
    document.getElementById('winnerArea').innerHTML = winnerText;
});

function sendChoice(rpsValue) {
    const choiceEvent = player1 ? "p1Choice" : "p2Choice";

=======
function sendChoice(rpsValue) {
    const choiceEvent = player1 ? "p1Choice" : "p2Choice";
>>>>>>> 73496b87bc711bd159ea981d4bb3c6055ac72b39
    socket.emit(choiceEvent, {
        rpsValue: rpsValue,
        roomUniqueId: roomUniqueId
    });
<<<<<<< HEAD

    let playerChoiceButton = document.createElement('button');
    playerChoiceButton.className = rpsValue.toLowerCase();
    playerChoiceButton.disabled = true;

    document.getElementById('player1Choice').innerHTML = "";
    document.getElementById('player1Choice').appendChild(playerChoiceButton);
=======
    let playerChoiceButton = document.createElement('button');
    playerChoiceButton.style.display = 'block';
    playerChoiceButton.innerText = rpsValue;
    document.getElementById('player1Choice').innerHTML = "";
    document.getElementById('player1Choice').appendChild(playerChoiceButton);

>>>>>>> 73496b87bc711bd159ea981d4bb3c6055ac72b39
}

function createOpponentChoiceButton(data) {
    document.getElementById('opponentState').innerHTML = "Opponent made a choice";
<<<<<<< HEAD

    let opponentButton = document.getElementById('opponentButton');
    if (!opponentButton) {
        opponentButton = document.createElement('button');
        opponentButton.id = 'opponentButton';
        opponentButton.disabled = true;
        document.getElementById('player2Choice').appendChild(opponentButton);
    }

    opponentButton.className = data.rpsValue.toLowerCase(); 
    opponentButton.style.display = 'none'; 
}
=======
}
>>>>>>> 73496b87bc711bd159ea981d4bb3c6055ac72b39
