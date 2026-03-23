const winds = [
    { id: 'aqshy', name: 'Акши (Ветер Огня)', rune: '🔥', desc: 'Воздух дрожит от жара. Пламенные маги Светлого Колледжа сегодня особенно сильны, а горожане жалуются на беспричинный гнев и духоту.' },
    { id: 'shyish', name: 'Шаиш (Ветер Смерти)', rune: '💀', desc: 'Тени удлинились, а воздух пахнет склепом. Некроманты чувствуют прилив сил. Время зажигать защитные руны и не выходить из дома ночью.' },
    { id: 'azyr', name: 'Азир (Ветер Небес)', rune: '⚡', desc: 'Небо искрит синей энергией. Астроманты видят будущее яснее, а неестественные бури собираются над горами Края Света.' },
    { id: 'ghyran', name: 'Гиран (Ветер Жизни)', rune: '🌿', desc: 'Даже сухие деревянные палки пускают побеги. Раны солдат затягиваются быстрее, но в густых лесах пробуждаются опасные твари.' },
    { id: 'chamon', name: 'Шамон (Ветер Металла)', rune: '⚙️', desc: 'Броня кажется тяжелее, а мечи звенят иначе. Золотые маги и алхимики Бальтазара Гельта сегодня могут творить настоящие чудеса.' },
    { id: 'ulgu', name: 'Ульгу (Ветер Тени)', rune: '🌫️', desc: 'Густой туман стелется по земле, путая мысли и дороги. Идеальное время для шпионов, ассасинов и иллюзионистов Серого Колледжа.' },
    { id: 'hysh', name: 'Хиш (Ветер Света)', rune: '✨', desc: 'Слепящий свет очищает разум. Демоны Хаоса слабеют в этих землях, а строгая логика и мудрость правят умами смертных.' },
    { id: 'ghur', name: 'Гур (Ветер Зверей)', rune: '🐺', desc: 'Животные беспокойны, а в людях просыпаются первобытные инстинкты. Охотники чувствуют себя увереннее в диких чащах.' }
];

const locationsLore = {
    'сильвания': 'shyish',
    'драконий погост': 'shyish',
    'нульн': 'aqshy',
    'альтдорф': 'azyr',
    'мариенбург': 'chamon',
    'атель лорен': 'ghyran',
    'нортланд': 'ghur'
};

const input = document.getElementById('provinceInput');
const btn = document.getElementById('btn-sense');
const resultBlock = document.getElementById('magicResult');
const windName = document.getElementById('windName');
const windRune = document.getElementById('windRune');
const windDesc = document.getElementById('windDesc');

btn.addEventListener('click', () => {
    const province = input.value.trim().toLowerCase();
    
    if (!province) {
        alert('Введите название провинции, чтобы направить взор астроманта!');
        return;
    }

    let selectedWind;
    
    if (locationsLore[province]) {
        selectedWind = winds.find(w => w.id === locationsLore[province]);
    } else {
        const randomIndex = Math.floor(Math.random() * winds.length);
        selectedWind = winds[randomIndex];
    }

    winds.forEach(w => resultBlock.classList.remove(`wind-${w.id}`));
    
    resultBlock.classList.add(`wind-${selectedWind.id}`);
    windName.textContent = selectedWind.name;
    windRune.textContent = selectedWind.rune;
    windDesc.textContent = selectedWind.desc;
    
    resultBlock.classList.remove('hidden');
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btn.click();
    }
});