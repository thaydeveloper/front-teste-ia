// services/products.ts
import { Product, ApiResponse, ProductApi, HttpStatus } from '../types';

/**
 * Helper to handle HTTP responses and map to ApiResponse.
 */
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = (await response.json()) as T;
  return {
    data,
    status: response.status,
    message: response.ok ? undefined : (data as any)?.message || response.statusText,
  };
}

// GET /products
export async function getProducts(): Promise<ApiResponse<Product[]>> {
  const res = await fetch(ProductApi.list, { method: 'GET' });
  return handleResponse<Product[]>(res);
}

// GET /products/:id
export async function getProduct(id: string): Promise<ApiResponse<Product>> {
  const res = await fetch(ProductApi.detail(id), { method: 'GET' });
  return handleResponse<Product>(res);
}

// POST /products
export async function createProduct(payload: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
  const res = await fetch(ProductApi.base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.status !== HttpStatus.Created) {
    return handleResponse<Product>(res);
  }
  return handleResponse<Product>(res);
}

// PUT /products/:id
export async function updateProduct(id: string, payload: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ApiResponse<Product>> {
  const res = await fetch(ProductApi.detail(id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<Product>(res);
}

// DELETE /products/:id
export async function deleteProduct(id: string): Promise<ApiResponse<null>> {
  const res = await fetch(ProductApi.detail(id), { method: 'DELETE' });
  return {
    data: null,
    status: res.status,
    message: res.ok ? undefined : res.statusText,
  };
}
