

// CONVERTER
const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");

// somInput.oninput = () => {
//     const request = new XMLHttpRequest();
//     request.open("GET", "../data/converter.json");
//     request.setRequestHeader("Content-type", "application_json");
//     request.send();

//     request.onload = () => {
//         const data = JSON.parse(request.response);

//         usdInput.value = (somInput.value / data.usd).toFixed(2);
//     };
// };

// usdInput.oninput = () => {
//     const request = new XMLHttpRequest();
//     request.open("GET", "../data/converter.json");
//     request.setRequestHeader("Content-type", "application_json");
//     request.send();

//     request.onload = () => {
//         const data = JSON.parse(request.response);

//         somInput.value = (usdInput.value * data.usd).toFixed(2);
//     };
// };

converter(usdInput, somInput);
converter(somInput, usdInput);


function converter(element, targetElement){
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "../data/converter.json");
        request.setRequestHeader("Content-type", "application_json");
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);

            if (element.id === 'som') {
                targetElement.value = (element.value / data.usd).toFixed(2);
            }
            if (element.id === 'usd') {
                targetElement.value = (element.value * data.usd).toFixed(2);
            }

            if (element.value === "") targetElement.value = "";
        };
    };
}

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

// MODAL POPUP WINDOW
