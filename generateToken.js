import axios from 'axios';

const API_URL = process.env.API_URL;
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

async function getToken(email, password) {
  try {
    const response = await axios.post(`${API_URL}/sessions`, { email, password });
    if (response.data && response.data.token) {
      return response.data.token;
    }
  } catch (error) {
    return null;
  }
  return null;
}

async function registerAndLogin(email, password) {
  const newUser = {
    email: `test${Date.now()}@example.com`,
    name: 'Docker User',
    password: password,
    confirmPassword: password,
  };

  try {
    await axios.post(`${API_URL}/users`, newUser);
    return await getToken(newUser.email, newUser.password);
  } catch (error) {
    return null;
  }
}

async function run() {
  if (!API_URL || !USER_EMAIL || !USER_PASSWORD) {
    console.error("Помилка: Змінні оточення API_URL, USER_EMAIL, USER_PASSWORD не встановлені.");
    process.exit(1); 
  }

  let token = await getToken(USER_EMAIL, USER_PASSWORD);

  if (!token) {
    token = await registerAndLogin(USER_EMAIL, USER_PASSWORD);
  }

  if (token) {
    console.log(token);
  } else {
    console.error("Критична помилка: не вдалося отримати токен.");
    process.exit(1);
  }
}

run();