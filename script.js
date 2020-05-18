// Les quatres pads de couleurs
var greenPad = $(".pad.shape1");
var yellowPad = $(".pad.shape2");
var redPad = $(".pad.shape3");
var bluePad = $(".pad.shape4");
// Le pad central noir
var blackPad = $(".circle");
// Tableau contennant tous les pads colorés
var pads = [greenPad, yellowPad, redPad, bluePad];
// Tableau contenant la suite de pad de la partie de simon
var melody = [];
// Tableau contenant la suite de pad joué par le joueur
var playerInput = [];
// Initialise le numéro du niveau à 1
var level = 1;
// Booléen permettant de déterminer si le joueur à gagné ou perdu
var hasPlayerLost = false;
// Animation d'activation du pad
function glowPad(pad) {
    pad.animate({ opacity: 1 }, 200);
    pad.children()[0].play();
    pad.animate({ opacity: 0.5 }, 200);
}
// Fonction lancée lors du click sur un pad coloré
function selectPad(pad) {
    glowPad(pad);
    playerInput.push(pad);
    if (playerInput.length == level) {
        setPadsUnclickable();
        levelVerification();
        if (!hasPlayerLost) {
            passLevel();
        }
    }
}
// Fonction lancée lorsque le joueur passe un niveau
// Cette fonction est asynchrone pour pouvoir utiliser la fonction sleep qui sera await
async function passLevel() {
    level += 1;
    setLevelLabel(level);
    playerInput = [];
    await sleep(1500);
    levelLoop();
    setPadsClickable();
}
// Fonction vérifiant si le joueur à bien joué ou non
function levelVerification() {
    for (var i = 0; i < melody.length; i++) {
        if (melody[i] != playerInput[i]) {
            blackPad.children()[0].textContent = "You loose";
            hasPlayerLost = true;
        }
    }
}
// Rends tous les pads colorés clickables
function setPadsClickable() {
    pads.forEach(pad => {
        pad.click(function () {
            selectPad(pad);
        })
    });
}
// Rends tous les pads colotés inclickables
function setPadsUnclickable() {
    pads.forEach(pad => {
        pad.off("click")
    })
    blackPad.off("click")
}
// Rends le pad noir clickable
function setBlackPadClickable() {
    blackPad.click(function () { startPlay() });
}
// Fonction initialisant le début d'une partie lorsque le joueur la lance
function startPlay() {
    setLevelLabel(level);
    setPadsUnclickable();
    levelLoop();
    setPadsClickable();
}
// Fonction permettant au Simon de "jouer" son coup
function levelLoop() {
    addRandomPadToMelody();
    playMelody();
}
// Permet de définir le niveau à afficher au centre du pad noir
function setLevelLabel(level) {
    blackPad.children()[0].textContent = "Level: " + level;
}
// Ajoute un pad à la fin du tableau melody
function addRandomPadToMelody() {
    melody.push(pads[getRandomInt(4)]);
}
// Joue la mélodie
function playMelody() {
    var interval;
    for (var i = 0; i < melody.length; i++) {
        setTimeout(glowPad, i * 500, melody[i])
    }
}
// On obtient un nombre aléatoire entre 0 et max-1
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
// Permet au programme de marquer une pause
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Initialise la scène
function init() {
    blackPad.children()[0].textContent = "Cliquez ici pour commencer";
    setBlackPadClickable();
}

init();