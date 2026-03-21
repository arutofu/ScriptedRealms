document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('adventure-form');
    const startButton = document.getElementById('start-adventure');
  
    // Включаем кнопку отправки, когда в каждом поле есть хотя бы 2 символов
    form.addEventListener('change', function(event) {
      const setting = document.getElementById('setting').value.trim(); // Удаляем пробелы в начале и конце строки
      const quest = document.getElementById('quest').value.trim();
      const charName = document.getElementById('char-name').value.trim();
      const charRace = document.getElementById('char-race').value.trim();
      const charClass = document.getElementById('char-class').value.trim();
      const charBackground = document.getElementById('char-background').value.trim();
  
      if (setting.length >= 2 && quest.length >= 2 && charName.length >= 2 && charRace.length >= 2 && charClass.length >= 2 && charBackground.length >= 5) {
        startButton.removeAttribute('disabled');
      } else {
        startButton.setAttribute('disabled', 'disabled');
      }
    });
  
    // Обработчик события отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const setting = document.getElementById('setting').value.trim();
        const quest = document.getElementById('quest').value.trim();
        const charName = document.getElementById('char-name').value.trim();
        const charRace = document.getElementById('char-race').value.trim();
        const charClass = document.getElementById('char-class').value.trim();
        const charBackground = document.getElementById('char-background').value.trim();

        if (setting.length >= 2 && quest.length >= 2 && charName.length >= 2 && charRace.length >= 2 && charClass.length >= 2 && charBackground.length >= 5) {
            startButton.removeAttribute('disabled');
        } 
        else {
            startButton.setAttribute('disabled', 'disabled');
            return; // Выходим из функции, если данные некорректны
        }

        // Добавляем параметры к URL страницы quest.html
        const queryParams = new URLSearchParams({
            'char-name': charName,
            'char-race': charRace,
            'char-class': charClass,
            'char-background': charBackground
        });

        // Перенаправляем пользователя на страницу quest.html с параметрами
        window.location.href = 'quest.html?' + queryParams.toString();
    });
});