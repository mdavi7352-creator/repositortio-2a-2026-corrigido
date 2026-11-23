// Camada de comunicação com a API.
// Defina EXPO_PUBLIC_API_URL no ambiente quando o backend estiver disponível.
// Exemplo: EXPO_PUBLIC_API_URL=https://seu-servidor.com/api

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.exemplo.com';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = `Erro na API: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, data) => request(path, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (path, data) => request(path, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (path) => request(path, { method: 'DELETE' }),
};

// Exemplos para quando as rotas do backend existirem:
// export const getItems = () => api.get('/items');
// export const getItemById = (id) => api.get(`/items/${id}`);
// export const createItem = (data) => api.post('/items', data);
