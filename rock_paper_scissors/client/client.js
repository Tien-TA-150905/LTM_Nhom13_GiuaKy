console.log("client.js excuting");

const socket = io();
let roomUniqueId = null;

function createGame() {
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
    document.getElementById('waitingArea').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
})

function sendChoice(rpsChoice) {

}