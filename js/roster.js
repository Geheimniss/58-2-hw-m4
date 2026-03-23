const charactersList = document.querySelector('.characters-list');

const fetchEmpireRoster = async () => {
    try {
        const response = await fetch('../data/characters.json');
        
        if (!response.ok) {
            throw new Error('Гонцы с донесением не вернулись!');
        }

        const data = await response.json();
        charactersList.innerHTML = '';

        data.forEach(unit => {
            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
                <div class="character-photo">
                    <img src="${unit.image}" alt="${unit.name}">
                </div>
                <div class="character-info">
                    <h3>${unit.name}</h3>
                    <span class="unit-type">${unit.type}</span>
                    <p class="unit-lore">${unit.description}</p>
                    
                    <div class="unit-stats">
                        <div class="stat"><span class="stat-icon">🛡️</span> ${unit.stats.armor}</div>
                        <div class="stat"><span class="stat-icon">⚔️</span> ${unit.stats.attack}</div>
                        <div class="stat"><span class="stat-icon">🛡️⚔️</span> ${unit.stats.defense}</div>
                    </div>
                </div>
            `;
            
            charactersList.append(card);
        });

    } catch (error) {
        console.error("Происки Хаоса: ", error);
        charactersList.innerHTML = `<h2 style="color: red;">Ошибка найма войск. Проверьте консоль.</h2>`;
    }
};

fetchEmpireRoster();