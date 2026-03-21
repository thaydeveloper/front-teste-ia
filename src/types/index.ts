// Tipagens compartilhadas da API
// Adicione aqui as interfaces e tipos que serão usados em services, hooks e componentes.

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Exemplo de tipagem de usuário

// Payloads para criação/atualização
export interface CreateUserPayload {
  name: string;
  email: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
}

// Endpoints da API de usuários
export const UserApi = {
  base: '/api/users',
  list: '/api/users',
  detail: (id: string) => `/api/users/${id}`,
};

// Enum de códigos de status HTTP comuns
export enum HttpStatus {
  OK = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404,
  Conflict = 409,
  InternalError = 500,
}

// Exemplo de tipagem de usuário
export interface User {
  id: string;
  name: string;
  email: string;
}
