

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

setTimeout(() => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  }, 10000); // 10 секунд

//AUTO SCROLL FOR TAB SLIDER
let currentIndex = 0;
setInterval(() => {
    currentIndex++;
    if (currentIndex >= tabContentItems.length) currentIndex = 0;
    hideTabContent();
    showTabContent(currentIndex);
}, 3000);
