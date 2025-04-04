/**
 * Функции для работы с API административной части
 */

// Базовая функция для API запросов
async function apiRequest(url, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Получаем CSRF-токен из cookies
  const csrfToken = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('csrftoken='));
  
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken.split('=')[1];
  }

  const options = {
    method,
    headers,
    credentials: 'include', // Включаем cookies
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`/api/admin/${url}`, options);

  if (!response.ok) {
    // Если сервер вернул не OK статус, выбрасываем ошибку
    const errorText = await response.text();
    let errorData;
    
    try {
      errorData = JSON.parse(errorText);
    } catch (e) {
      errorData = { error: errorText || 'Произошла ошибка при запросе' };
    }
    
    throw new Error(errorData.error || 'Ошибка при запросе к API');
  }

  // Для HEAD и DELETE не возвращаем данные
  if (method === 'HEAD' || method === 'DELETE') {
    return null;
  }

  return await response.json();
}

// Экспортируемый объект с методами API
export const adminApi = {
  // Получение статистики
  async getStats() {
    return await apiRequest('stats/');
  },

  // Пользователи
  async getUsers(params = {}) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    }
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return await apiRequest(`users/${query}`);
  },

  async createUser(userData) {
    return await apiRequest('users/', 'POST', userData);
  },

  async updateUser(userId, userData) {
    return await apiRequest(`users/${userId}/`, 'PATCH', userData);
  },

  async deleteUser(userId) {
    return await apiRequest(`users/${userId}/`, 'DELETE');
  },

  // Настройки
  async getSettings() {
    return await apiRequest('settings/');
  },

  async updateSettings(settings) {
    return await apiRequest('settings/', 'POST', settings);
  },

  // Логи
  async getLogs(params = {}) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value);
      }
    }
    const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return await apiRequest(`logs/${query}`);
  }
};

// Для использования в других модулях
export default adminApi; 