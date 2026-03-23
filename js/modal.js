const modal = document.getElementById('diplomacyModal');
const btnSummon = document.getElementById('btn-summon');
const closeModal = document.getElementById('closeModal');
const form = document.getElementById('diplomacyForm');

const openModal = () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
};

const hideModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

if (btnSummon) {
    btnSummon.addEventListener('click', (e) => {
        e.preventDefault(); 
        openModal();
    });
}

if (closeModal) {
    closeModal.addEventListener('click', hideModal);
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        hideModal();
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    alert('Гонец отправлен в Альтдорф! Ожидайте ответа (или нападения зеленокожих).');
    form.reset(); 
    hideModal();  
});