const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('#btn-get');
const closeModalBtn = document.querySelector('.modal_close');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function handleScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        openModal();
        window.removeEventListener('scroll', handleScroll);
        document.body.style.overflow = 'hidden';
    }
}

window.addEventListener("scroll", handleScroll);

openModalBtn.onclick = openModal;
closeModalBtn.onclick = closeModal;

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
}

setTimeout(() => {
    modal.style.display = "block";
  }, 10000); // 10 секунд