import apiClient from './client';

export const restaurantsApi = {
  getAll: (params?: Record<string, string>) => apiClient.get('/restaurants', { params }),
  getById: (id: string) => apiClient.get(`/restaurants/${id}`),
};

export const productsApi = {
  getByStore: (storeId: string) => apiClient.get(`/products?storeId=${storeId}`),
  getById: (id: string) => apiClient.get(`/products/${id}`),
};

export const ordersApi = {
  create: (data: any) => apiClient.post('/orders', data),
  getMyOrders: () => apiClient.get('/orders/my'),
  getById: (id: string) => apiClient.get(`/orders/${id}`),
};

export const authApi = {
  login: (data: { phone: string; password: string }) => apiClient.post('/auth/login', data),
  register: (data: any) => apiClient.post('/auth/register', data),
  me: () => apiClient.get('/auth/me'),
};
