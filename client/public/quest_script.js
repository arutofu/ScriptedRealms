document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные из предыдущего запроса и заполняем поля
    const params = new URLSearchParams(window.location.search);
    const charName = params.get('char-name');
    const charRace = params.get('char-race');
    const charClass = params.get('char-class');
    const charBackground = params.get('char-background');
  
    const sendMessageBtn = document.getElementById('send-message-btn');
    const narratorField = document.getElementById('narrator-field');
    const userInput = document.getElementById('user-input');

    // Заполняем поля на странице quest.html
    document.getElementById('char-name').value = charName;
    document.getElementById('char-race').value = charRace;
    document.getElementById('char-class').value = charClass;
    document.getElementById('char-background').value = charBackground;

    // Обработчик события нажатия на кнопку "Отправить"
    sendMessageBtn.addEventListener('click', function() {
        const message = userInput.value.trim(); // Получаем текст сообщения пользователя
        if (message) {
        // Отправляем запрос на API ChatGPT
        fetch('/generate-response', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            // Отображаем ответ от ChatGPT в поле для нарратора
            narratorField.innerHTML += `<p class="narrator-response">${data.response}</p>`;
            // Очищаем поле ввода пользователя
            userInput.value = '';
        })
        .catch(error => console.error('Произошла ошибка:', error));
        } else {
        // Если сообщение пользователя пустое, выведите предупреждение или просто игнорируйте
        console.log('Сообщение пустое. Введите текст.');
        }
    });

    // Функция для отправки запроса к OpenAI API и получения ответа
    async function generateResponse(userInput) {
    try {
      // Отправляем запрос к OpenAI API
      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: userInput,
          max_tokens: 150 // Максимальное количество токенов в ответе
        })
      });
  
      // Проверяем, получен ли успешный ответ
      if (response.ok) {
        // Получаем данные ответа в формате JSON
        const data = await response.json();
        // Возвращаем ответ от ChatGPT
        return data.choices[0].text.trim();
      } else {
        // Если ответ не успешный, выкидываем ошибку
        throw new Error('Ошибка получения ответа от сервера OpenAI');
      }
    } catch (error) {
      // Обрабатываем возможные ошибки
      console.error('Произошла ошибка:', error);
      return 'Произошла ошибка при получении ответа от сервера';
    }
  }

  });