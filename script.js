// Holder styr på hvilke rom spilleren har besøkt
let history = ['img/rom1.png'];

updateClickables('room1'); //starter i rom 1 og stopper andre div-er relatert til andre rom til å vise

// Kobler romnavn til bildefiler
const rooms = {
    'room1': 'img/rom1.png',
    'letter': 'img/letter1.png',
    'door': 'img/rom1_door.png',
    'hallway': 'img/hallway.png',
    'gate': 'img/gate.png',
    'downwardArrow': 'img/down_arrow.png',
    'room2': 'img/room2.png',
    'room2_noKey': 'img/room2_noKey.png',
    'outside': 'img/outside.png'
};

function switchRoom(roomName) {
    const newImage = rooms[roomName];
    if (doorUnlock && roomName == 'hallway') {
        history.push(newImage);
        document.body.style.backgroundImage = "url('" + newImage + "')";
        updateClickables(roomName);
    }
    else if (hasKey && roomName == 'outside') {
        history.push(newImage);
        document.body.style.backgroundImage = "url('" + newImage + "')";
        updateClickables(roomName);
    }
    else if (roomName !== 'hallway' && roomName !== "outside") {
        history.push(newImage);
        document.body.style.backgroundImage = "url('" + newImage + "')";
        updateClickables(roomName);

        if (roomName === 'room2_noKey') {
            hasKey = true;
        }
    }
}
let hasKey = false;
// Går tilbake til forrige rom
function goBack() {
    if (history.length > 1) {       // sjekker om det er noe å gå tilbake til
        history.pop();              // fjerner nåværende rom
        const previous = history[history.length - 1];

        document.body.style.backgroundImage = "url('" + previous + "')";

        // finner romnavnet basert på bildefilen
        const roomName = Object.keys(rooms).find(k => rooms[k] === previous);
        updateClickables(roomName);
    }
}

// Viser klikkbare soner for nåværende rom, skjuler resten
function updateClickables(roomName) {
    document.querySelectorAll('.clickable').forEach(el => el.style.display = 'none'); // skjuler alle
    document.querySelectorAll('.' + roomName).forEach(el => el.style.display = 'block'); // viser riktige
}

let doorUnlock = false;
const correctCombo = ['king', 'crest', 'knight'];
let currentCombo = [];

document.querySelectorAll('.picture_btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCombo.push(btn.id);
        btn.classList.add('selected');
        if (currentCombo.length === correctCombo.length) {
            doorUnlock = true;
            for (let i = 0; i < correctCombo.length; i++) {
                if (currentCombo[i] !== correctCombo[i]) {
                    doorUnlock = false;
                }
            }
            if (doorUnlock == false) {
                currentCombo = [];
                document.querySelectorAll('.picture_btn').forEach(el => el.classList.remove('selected'));

            }
          
        }

    });
});

