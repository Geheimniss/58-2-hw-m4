document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    let chaosTimer;

    const mark = document.createElement('div');
    mark.innerHTML = '🜏';
    mark.classList.add('mark-of-chaos');
    mark.title = "Не прикасайся...";
    body.appendChild(mark);

    const unleashChaos = () => {
        if (body.classList.contains('chaos-active')) return; 
        
        body.classList.add('chaos-active');
        
        clearTimeout(chaosTimer);
        chaosTimer = setTimeout(() => {
            body.classList.remove('chaos-active');
            
            setTimeout(() => {
                alert("+++ ВНИМАНИЕ +++\nЗафиксирован всплеск энергии Варпа. Ожидайте прибытия Охотников на Ведьм для допроса.");
            }, 500);
            
        }, 3500);
    };

    mark.addEventListener('click', unleashChaos);

    const secretCode = "chaos";
    let inputString = "";

    document.addEventListener('keydown', (e) => {
        inputString += e.key.toLowerCase();
        
        if (inputString.length > secretCode.length) {
            inputString = inputString.slice(-secretCode.length);
        }
        
        if (inputString === secretCode) {
            unleashChaos();
            inputString = ""; 
        }
    });
});