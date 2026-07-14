
const audio = document.getElementById("bgSound");

document.addEventListener("click", function startAudio() {
audio.play();
document.removeEventListener("click", startAudio);
});



document.addEventListener("keydown", (event) => {
if (event.code === "Space") {
event.preventDefault(); 

audio.play().catch(err => {
console.error(err);
});
}
});



const images = [
"./forest.gif",
"./forest2.gif",
"./forest3.gif",
"./forest4.gif",
"./forest5.gif",
"./forest6.gif",
"./forest7.gif",
"./forest8.gif",
"./forest9.gif",
"./forest.gif",


];

let index = 1;

const intervalID =  setInterval(() => {
index = (index + 1) % images.length;
document.body.style.backgroundImage = `url('${images[index]}')`;
}, 4000);

var score = 10;
var FinalScore = 0;
var scrollTimer, runTimer;
function startGame() {
jump();
stopJump();
createEnemy();

}
function createEnemy() {

const enamy = [

'<img src="./tiger.gif" style="height:300px" class="dangerous">',
'<img src="./lion2.gif" style="height:350px" class="dangerous">',
'<img src="./lion.gif" class="dangerous">',
'<img src="./dinosaur.gif" class="dangerous">',
];

let indexenamy = 1;

const intervalenamy =  setInterval(() => {
indexenamy = (indexenamy + 1) % enamy.length;
$("body").append(`${enamy[indexenamy]}`);


var enemyPos = $(window).scrollLeft() + 3000;
$(".dangerous").last().css({ left: enemyPos });
if (FinalScore >= 0) {
$("#score").html("Your Score : " + FinalScore++);
}
}, 2500);


}

function updateScroll() {
score += 10;
$(window).scrollLeft(score);
}

function checkCollision() {
var enemies = document.getElementsByClassName("dangerous");
var scrollPos = $(window).scrollLeft();
var hunterScreenX = 10;
for (let i = 0; i < enemies.length; i++) {
var enemyLeft = parseInt(enemies[i].style.left);
var enemyScreenX = enemyLeft - scrollPos;

if (
enemyScreenX >= hunterScreenX - 20 &&
enemyScreenX <= hunterScreenX + 60 &&
!$("#hunter").hasClass("jump")
) {
gameOver(score);
}
}
}

function gameOver(finalScore) {
clearInterval(scrollTimer);
clearInterval(runTimer);

$("#hunter").animate({ "margin-left": "-500px" });
$(".dangerous").animate({ "margin-left": "-700px" });
$("#over").fadeIn(2000);
$("#go").fadeOut();
$("#reload").fadeIn(2000);
audio.pause();
audio.currentTime = 0;
clearInterval(intervalID);
document.body.style.backgroundImage = `url('./forest.gif')`;
$('#score').hide();

}

function jump() {
$("#hunter").addClass("jump");

}

function stopJump() {
$("#hunter").removeClass("jump");
}

window.onkeydown = function (e) {
if (e.keyCode === 32) jump();
};

window.onkeyup = function (e) {
if (e.keyCode === 32) stopJump();
};

/* mouse */
window.onclick = function () {
jump();
setTimeout(stopJump, 1000);
};
scrollTimer = setInterval(updateScroll, 10);
runTimer = setInterval(checkCollision, 10);

function reloadGame() {
location.reload();
}

if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || ('ontouchstart' in window)) {

var mobileBtn = document.getElementById('mobile-jump-btn');
mobileBtn.style.display = 'flex';

var scrollDiv = document.createElement('div');
scrollDiv.id = 'mobile-scroll-container';
scrollDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;overflow-x:scroll;overflow-y:hidden;';
var spacer = document.createElement('div');
spacer.style.cssText = 'width:99999999px;height:1px;';
scrollDiv.appendChild(spacer);
document.body.appendChild(scrollDiv);

var _origScrollLeft = Object.getOwnPropertyDescriptor(window, 'scrollLeft');
Object.defineProperty(window, 'scrollLeft', {
get: function() { return scrollDiv.scrollLeft; },
set: function(v) { scrollDiv.scrollLeft = v; }
});

document.addEventListener('touchstart', function(e) {
if (e.target !== mobileBtn && e.target.id !== 'reload') {
jump();
setTimeout(stopJump, 700);
}
}, { passive: true });

mobileBtn.addEventListener('touchstart', function(e) {
e.preventDefault();
jump();
setTimeout(stopJump, 700);
}, { passive: false });

document.getElementById('go').textContent = 'Tap Screen To Jump';

} else {
}


document.onkeydown = function (e) {
if (
e.ctrlKey &&
(
e.keyCode === 67 ||
e.keyCode === 86 ||
e.keyCode === 85 ||
e.keyCode === 117
)
) {
return false;
} else {
return true;
}
};

$(document).keypress("u", function (e) {
if (e.ctrlKey) {
return false;
} else {
return true;
}
});

document.addEventListener("contextmenu", function (e) {
e.preventDefault();
}, false);

$(document).keydown(function (event) {
if (event.keyCode == 123) {
return false;
} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
return false;
}});

