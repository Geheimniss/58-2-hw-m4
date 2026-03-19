

// CONVERTER
const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const inputs = [somInput, usdInput, eurInput];

inputs.forEach(input => {
    input.oninput = () => {

        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();

        request.onload = () => {

            const data = JSON.parse(request.response);

            if (input.id === "som") {
                usdInput.value = (input.value / data.usd).toFixed(2);
                eurInput.value = (input.value / data.eur).toFixed(2);
            }

            if (input.id === "usd") {
                somInput.value = (input.value * data.usd).toFixed(2);
                eurInput.value = ((input.value * data.usd) / data.eur).toFixed(2);
            }

            if (input.id === "eur") {
                somInput.value = (input.value * data.eur).toFixed(2);
                usdInput.value = ((input.value * data.eur) / data.usd).toFixed(2);
            }

            if (input.value === "") {
                somInput.value = "";
                usdInput.value = "";
                eurInput.value = "";
            }
        };
    };
});

// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabContentItems = document.querySelectorAll('.tab_content_item');
const tabContentItemsParent = document.querySelector('.tab_content_items');

function hideTabContent() {
    tabContentBlocks.forEach(tabBlock => {
        tabBlock.style.display = 'none';
    })
    tabContentItems.forEach(tabItem => {
        tabItem.classList.remove('tab_content_item_active');
    })

}
function showTabContent(i=0) {
    tabContentBlocks[i].style.display = 'block';
    tabContentItems[i].classList.add('tab_content_item_active');
}

hideTabContent();
showTabContent();

tabContentItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabContentItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem)
            {
                hideTabContent();
                showTabContent(tabIndex);
            }
        })
    }
}

//AUTO SCROLL FOR TAB SLIDER
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

// универсальная функция загрузки
function fetchCard (id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => res.json())
        .then(data => {
            const { title, id, completed } = data;

            cardBlock.innerHTML = `
                <p>${title}</p>
                <p style="color:${completed ? 'lime' : 'red'}">
                    ${completed ? 'completed' : 'todo'}
                </p>
                <span>${id}</span>
            `;
        });
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

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => console.log(data));