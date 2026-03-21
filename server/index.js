// Подключение Express.js
const express = require('express');
const app = express();
const OpenAI = require('openai');
const cors = require('cors');
const port = 3000; // Порт, на котором будет запущен сервер

app.use(cors()); // Включаем поддержку CORS
app.use(express.json()); // Добавляем middleware для разбора JSON-данных из тела запроса

// Конфигурация API OpenAI
const openaiConfig = {
  apiKey: 'Bearer ${process.env.OPENAI_API_KEY}' // Используем API ключ из переменной окружения
};

const openaiInstance = new OpenAI({ apiKey: openaiConfig.apiKey }); // Создаем экземпляр OpenAI с использованием API ключа

// Обработчик маршрута для отправки запроса на API ChatGPT
app.post('/generate-response', async (req, res) => {
  try {
    const { message } = req.body; // Получаем сообщение пользователя из тела запроса
    const response = await openaiInstance.completions.create({
      engine: 'text-davinci-002',
      prompt: 'Вы: ' + message
    });
    res.json({ response: response.data.choices[0].message.content }); // Отправляем ответ от ChatGPT обратно на клиент
  } catch (error) {
    console.error('Произошла ошибка:', error);
    res.status(500).json({ error: 'Произошла ошибка при обработке запроса' });
  }
});

// Middleware для обслуживания статических файлов из папки client/public
app.use(express.static('../client/public'));

app.post('/handle-form', (req, res) => {
  console.log('Получен POST запрос на /handle-form');
  // Обработка данных из формы
  // Перенаправление пользователя на страницу quest.html
  res.redirect('/quest.html');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`); // Вывод сообщения о запуске сервера в консоль
});