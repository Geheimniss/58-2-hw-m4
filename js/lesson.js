// CONVERTER
const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const inputs = [somInput, usdInput, eurInput];

inputs.forEach(input => {
    input.oninput = async () => {
        try {
            const res = await fetch("../data/converter.json");
            const data = await res.json();

            if (input.id === "som") {
                usdInput.value = input.value ? (input.value / data.usd).toFixed(2) : '';
                eurInput.value = input.value ? (input.value / data.eur).toFixed(2) : '';
            }

            if (input.id === "usd") {
                somInput.value = input.value ? (input.value * data.usd).toFixed(2) : '';
                eurInput.value = input.value ? ((input.value * data.usd) / data.eur).toFixed(2) : '';
            }

            if (input.id === "eur") {
                somInput.value = input.value ? (input.value * data.eur).toFixed(2) : '';
                usdInput.value = input.value ? ((input.value * data.eur) / data.usd).toFixed(2) : '';
            }

            if (input.value === "") {
                somInput.value = "";
                usdInput.value = "";
                eurInput.value = "";
            }
        } catch (error) {
            console.error("Ошибка загрузки курса валют:", error);
        }
    };
});

// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabContentItems = document.querySelectorAll('.tab_content_item');
const tabContentItemsParent = document.querySelector('.tab_content_items');

function hideTabContent() {
    tabContentBlocks.forEach(tabBlock => {
        tabBlock.style.display = 'none';
    });
    tabContentItems.forEach(tabItem => {
        tabItem.classList.remove('tab_content_item_active');
    });
}

function showTabContent(i = 0) {
    tabContentBlocks[i].style.display = 'block';
    tabContentItems[i].classList.add('tab_content_item_active');
}

hideTabContent();
showTabContent();

tabContentItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabContentItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent();
                showTabContent(tabIndex);
            }
        });
    }
};

// AUTO SCROLL FOR TAB SLIDER
let currentIndex = 0;
setInterval(() => {
    currentIndex++;
    if (currentIndex >= tabContentItems.length) currentIndex = 0;
    hideTabContent();
    showTabContent(currentIndex);
}, 3000);

// CARDS
const cardBlock = document.querySelector('.card');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');

let cardId = 1; // сразу 1, чтобы не было пусто
const maxId = 200;

// универсальная функция загрузки с async/await
async function fetchCard(id) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await res.json();
        const { title, id: dataId, completed } = data;

        cardBlock.innerHTML = `
            <p>${title}</p>
            <p style="color:${completed ? 'lime' : 'red'}">
                ${completed ? 'completed' : 'todo'}
            </p>
            <span>${dataId}</span>
        `;
    } catch (error) {
        console.error("Ошибка загрузки карточки:", error);
        cardBlock.innerHTML = `<p>Ошибка загрузки карточки</p>`;
    }
}

fetchCard(cardId);

btnNext.onclick = () => {
    cardId = cardId >= maxId ? 1 : cardId + 1;
    fetchCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? maxId : cardId - 1;
    fetchCard(cardId);
};

async function fetchPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("Ошибка загрузки постов:", error);
    }
}
fetchPosts();

// WEATHER BLOCK
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#search');
const city = document.querySelector('.city');
const temp = document.querySelector('.temp');

const API_KEY = '291aa3950880603684e43c6cc36aed88';
const VERSION = '2.5';
const BASE_API = `https://api.openweathermap.org/data/${VERSION}/weather`;

searchBtn.onclick = async () => {
    try {
        const res = await fetch(`${BASE_API}?q=${searchInput.value}&units=metric&lang=ru&appid=${API_KEY}`);
        const data = await res.json();
        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp);
    } catch (error) {
        console.error("Ошибка загрузки погоды:", error);
        city.innerHTML = "Ошибка";
        temp.innerHTML = "";
    }
};