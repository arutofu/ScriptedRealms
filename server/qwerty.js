const axios = require('axios');

const proxyUrl = 'http://4.16.68.158'; // IP-адрес прокси-сервера
const openaiUrl = 'https://api.openai.com/v1/completions'; // URL для запроса к OpenAI API
const apiKey = 'Bearer ${process.env.OPENAI_API_KEY}';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
};

const prompt = "Как дела?";

const config = {
  url: proxyUrl + '/' + openaiUrl,
  method: 'post',
  headers: headers,
  data: {
    prompt: prompt,
    max_tokens: 150,
    engine: 'text-davinci-002',
    stop: '\n'
  },
  timeout: 50000
};

axios.request(config)
  .then(response => {
    console.log(response.data.choices[0].text.trim());
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
