// ----- 1 задание) Gmail validator -----
const gmailInput = document.getElementById("gmail_input");
const gmailButton = document.getElementById("gmail_button");
const gmailResult = document.getElementById("gmail_result");

// строго gmail.com
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = (e) => {
    e.preventDefault(); // на всякий случай чтобы сайт не перезагружался

    const value = gmailInput.value.trim();

    if (value.length === 0) {
        gmailResult.textContent = "Введите почту";
        gmailResult.style.color = "orange";
        return;
    } 
    else if (value.length <= 2) {
        gmailResult.textContent = "Почта не может быть короче 6 символов"
    }

    if (gmailRegex.test(value)) {
        gmailResult.textContent = "✅ Gmail валиден";
        gmailResult.style.color = "lime";
    } 
    else {
        gmailResult.textContent = "❌ Невалидный Gmail";
        gmailResult.style.color = "red";
    }
};


// ----- Moving block using recursion v2.0 -----
const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

// старт позиция
let positionX = 0;
let positionY = 0;
// шаг (скорость в пикселях)
const step = 2;
// фдаг чтобы отслеживать идет ли анимация
let isMoving = false;


function moveRectangleRecursive() {
    if (!isMoving) isMoving = true;

    // ширина родителя и ребенка
    const parentWidth = parentBlock.clientWidth;
    const childWidth = childBlock.offsetWidth;

    // высота родителя и ребенка
    const parentHeight = parentBlock.clientHeight;
    const childHeight = childBlock.offsetHeight;

    // максимальная позиция чтобы не вылетало за рамки
    const maxWidth = parentWidth - childWidth;
    const maxHeight = parentHeight - childHeight;

    // движение влево
    if (positionX < maxWidth && positionY === 0) {
        positionX += step;
        childBlock.style.left = `${positionX}px`;
    // движение вправо
    } else if (positionX >= maxWidth && positionY < maxHeight) {
        positionY += step;
        childBlock.style.top = `${positionY}px`;

    } else if (positionY >= maxHeight && positionX > 0) {
        positionX -= step;
        childBlock.style.left = `${positionX}px`;

    } else if (positionX === 0 && positionY > 0) {
        positionY -= step;
        childBlock.style.top = `${positionY}px`;
    }

    requestAnimationFrame(moveRectangleRecursive);
}

moveRectangleRecursive();

// ----- Homework 2 -----
// Задание 2)
const seconds = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let counter = 0;
let interval = null;

startBtn.onclick = () => {
    if (interval !== null) return;

    interval = setInterval(() => {
        counter++
        seconds.innerText = counter
    }, 1000);
};

stopBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
};

resetBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
    counter = 0;
    seconds.innerText = counter;
};