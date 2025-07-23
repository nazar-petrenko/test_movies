// generateToken.js
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv'; 

dotenv.config();

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/api/v1';

async function tryLogin(email, passwords) {
  for (const password of passwords) {
    console.log(`🔑 Спроба входу з паролем: ${password}`);
    
    try {
      const sessionRes = await axios.post(`${API_URL}/sessions`, {
        email: email,
        password: password
      });
      
      if (sessionRes.data.status !== 0 || sessionRes.data.token) {
        console.log('Успішний вхід!');
        return { success: true, data: sessionRes.data, password: password };
      } else {
        console.log('Невдалий вхід (status: 0)');
      }
    } catch (err) {
      console.log('Помилка входу:', err.response?.data?.error?.code || err.message);
    }
  }
  
  return { success: false };
}

async function createNewUser(userData) {
  try {
    const createRes = await axios.post(`${API_URL}/users`, userData);

    if (createRes.data.status === 0 && createRes.data.error) {
      console.log('Помилка створення:', createRes.data.error);
      return false;
    } else {
      console.log('Користувач створений успішно!');
      return true;
    }
  } catch (err) {
    console.log('Помилка створення:', err.response?.data || err.message);
    return false;
  }
}

async function run() {
  try {
    console.log('=== ПЕРЕВІРКА ДАНИХ ===');
    const email = process.env.VITE_USER_EMAIL;
    const password = process.env.VITE_USER_PASSWORD;
    
    console.log('API_URL:', API_URL);
    console.log('Email:', email);
    
    if (!email || !password) {
      throw new Error('Email або пароль не встановлені в .env файлі');
    }

    console.log('\n=== СПРОБА ВХОДУ ПІД ІСНУЮЧОГО КОРИСТУВАЧА ===');
    const possiblePasswords = [
      password,           
      'password1111',     
      'super-password',   
      'pasword1111',      
    ];
    
    let loginResult = await tryLogin(email, possiblePasswords);
    
    if (!loginResult.success) {
      console.log('\n=== СТВОРЕННЯ НОВОГО КОРИСТУВАЧА ===');
      
      const timestamp = Date.now();
      const newEmail = `test${timestamp}@gmail.com`;
      const newPassword = 'password1111';
      
      console.log(`Створюємо нового користувача: ${newEmail}`);
      
      const newUser = {
        email: newEmail,
        name: 'Test User',
        password: newPassword,
        confirmPassword: newPassword,
      };
      
      const userCreated = await createNewUser(newUser);
      
      if (userCreated) {
        console.log('Спроба входу під новим користувачем...');
        loginResult = await tryLogin(newEmail, [newPassword]);
        
        if (loginResult.success) {
          console.log('Оновлюємо .env файл з новими даними...');
          const envPath = '.env';
          let env = fs.readFileSync(envPath, 'utf-8');
          env = env.replace(/VITE_USER_EMAIL=.*/g, `VITE_USER_EMAIL=${newEmail}`);
          env = env.replace(/VITE_USER_PASSWORD=.*/g, `VITE_USER_PASSWORD=${newPassword}`);
          fs.writeFileSync(envPath, env);
        }
      }
    }

    if (!loginResult.success) {
      throw new Error('Не вдалося увійти жодним способом');
    }

    console.log('\n=== ОТРИМАННЯ ТОКЕНА ===');
    const responseData = loginResult.data;
    console.log('Дані відповіді:', JSON.stringify(responseData, null, 2));
    
    const token = responseData.token || 
                  responseData.data?.token || 
                  responseData.accessToken ||
                  responseData.authToken;

    if (!token) {
      throw new Error('Токен не знайдено у відповіді сервера');
    }

    console.log('Токен знайдено:', token.substring(0, 20) + '...');

    const envPath = '.env';
    const env = fs.readFileSync(envPath, 'utf-8');
    const updated = env.replace(/VITE_AUTH_TOKEN=.*/g, '') + `\nVITE_AUTH_TOKEN=${token}\n`;
    fs.writeFileSync(envPath, updated.trim() + '\n');
    
    console.log('\nУСПІХ!');
    console.log('Токен успішно записано в .env файл');
    console.log('Використовувався пароль:', loginResult.password);

  } catch (err) {
    console.log('\nКРИТИЧНА ПОМИЛКА:', err.message);
    process.exit(1);
  }
}

run();