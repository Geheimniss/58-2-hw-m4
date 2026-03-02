// ----- 1 задание) Gmail validator -----
const gmailInput = document.getElementById("gmail_input");
const gmailButton = document.getElementById("gmail_button");
const gmailResult = document.getElementById("gmail_result");

// строго gmail.com
const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.addEventListener("click", (e) => {
    e.preventDefault(); // на всякий случай чтобы сайи не перезагружался

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
});


// ----- 2 задание) Moving block using recursion -----
const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

// старт позиция
let position = 0;
// шаг (скорость в пикселях)
const step = 2;
// фдаг чтобы отслеживать идет ли анимация
let isMoving = false;


function moveRightRecursive() {
    if (!isMoving) isMoving = true;

    // ширина родителя и ребенка
    const parentWidth = parentBlock.clientWidth;
    const childWidth = childBlock.clientWidth;

    // максимальная позиция чтобы не вылетало за рамки
    const maxPosition = parentWidth - childWidth;

    if (position >= maxPosition) {
        // остановка
        childBlock.style.left = `${maxPosition}px`;
        isMoving = false;
        return;
    }

    position += step;
    childBlock.style.left = `${position}px`;

    requestAnimationFrame(moveRightRecursive);
}

// добавил запуск движения по клику
parentBlock.addEventListener("click", () => {
    if (isMoving) return;
    position = 0;
    childBlock.style.left = "0px";

    moveRightRecursive();
});

moveRightRecursive();