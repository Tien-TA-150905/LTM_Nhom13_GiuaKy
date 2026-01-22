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

function sendChoice(rpsValue) {
    const choiceEvent = player1 ? "p1Choice" : "p2Choice";
    socket.emit(choiceEvent, {
        rpsValue: rpsValue,
        roomUniqueId: roomUniqueId
    });
    let playerChoiceButton = document.createElement('button');
    playerChoiceButton.style.display = 'block';
    playerChoiceButton.innerText = rpsValue;
    document.getElementById('player1Choice').innerHTML = "";
    document.getElementById('player1Choice').appendChild(playerChoiceButton);

}

function createOpponentChoiceButton(data) {
    document.getElementById('opponentState').innerHTML = "Opponent made a choice";
}