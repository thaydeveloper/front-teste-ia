import { User, CreateUserPayload, UpdateUserPayload, ApiResponse, UserApi, HttpStatus } from '../types';

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

export async function getUsers(): Promise<ApiResponse<User[]>> {
  const res = await fetch(UserApi.list, { method: 'GET' });
  return handleResponse<User[]>(res);
}

export async function getUser(id: string): Promise<ApiResponse<User>> {
  const res = await fetch(UserApi.detail(id), { method: 'GET' });
  return handleResponse<User>(res);
}

export async function createUser(payload: CreateUserPayload): Promise<ApiResponse<User>> {
  const res = await fetch(UserApi.base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.status !== HttpStatus.Created) {
    // still return response for error handling
    return handleResponse<User>(res);
  }
  return handleResponse<User>(res);
}

export async function updateUser(id: string, payload: UpdateUserPayload): Promise<ApiResponse<User>> {
  const res = await fetch(UserApi.detail(id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<User>(res);
}

export async function deleteUser(id: string): Promise<ApiResponse<null>> {
  const res = await fetch(UserApi.detail(id), { method: 'DELETE' });
  // No content expected for delete
  return {
    data: null,
    status: res.status,
    message: res.ok ? undefined : res.statusText,
  };
}
