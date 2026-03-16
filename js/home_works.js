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
        gmailResult.textContent = "Почта не может быть короче 6 символов";
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
let isMoving = true;

function moveRectangleRecursive() {
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
}

// ЗДЕСЬ ЗАПУСКАЕТСЯ ДВИЖЕНИЕ ПРЯМОУГОЛЬНИКА;
let moveInterval = setInterval(moveRectangleRecursive, 5);

// остановка и запуск прямоугольника по клику
parentBlock.onclick = () => {
    if (isMoving) {
        isMoving = false;
        clearInterval(moveInterval);
        interval = null;
    }
    else {
        isMoving = true;
        moveInterval = setInterval(moveRectangleRecursive, 5);
    }
};

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


// CHARACTERS CARDS
const container = document.querySelector(".characters-list");

const request = new XMLHttpRequest();

request.open("GET", "../data/characters.json");

request.setRequestHeader("Content-type", "application/json");

request.onload = () => {

    const characters = JSON.parse(request.response);

    characters.forEach(character => {

        const card = document.createElement("div");
        card.classList.add("character-card");

        card.innerHTML = `
            <img src="${character.photo}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>Age: ${character.age}</p>
        `;

        container.append(card);

    })
}

request.send() 

// 2)
const request2 = new XMLHttpRequest()

request2.open("GET", "../data/test.json")

request2.setRequestHeader("Content-type", "application/json")

request2.onload = () => {

    const data = JSON.parse(request2.response)
    console.log(data)

}

request2.send()
