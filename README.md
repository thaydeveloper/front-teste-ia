# Product Manager Frontend (Next.js)

Este é um aplicativo **frontend** desenvolvido com **Next.js**, **React** e **TypeScript** que fornece uma interface de CRUD (Create, Read, Update, Delete) para gerenciamento de produtos. Ele consome uma API RESTful implementada nas rotas API do próprio Next.js (`/pages/api/products`).

---

## Tecnologias Utilizadas

- **Next.js** (última versão) – framework React para renderização híbrida (SSR/SSG) e rotas API.
- **React 19** – componentes funcionais com hooks.
- **TypeScript** – tipagem estática.
- **Tailwind CSS** – estilos utilitários.
- **Bootstrap 5** – componentes UI (opcional).

---

## Como Executar o Projeto

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   O aplicativo ficará disponível em `http://localhost:3000` (ou na porta indicada pelo terminal).

3. **Compilar para produção**
   ```bash
   npm run build   # gera a build em .next
   npm start       # inicia o servidor em modo produção
   ```

---

## Contrato da API de Produtos

Todas as rotas retornam **`application/json`** e seguem o padrão de resposta genérica:
```json
{
  "data": <payload>,
  "status": <código HTTP>,
  "message": "<texto opcional>"
}
```

### Estrutura do Objeto `Product`
```ts
interface Product {
  id: string;               // UUID ou string única gerada pelo backend
  name: string;              // Nome do produto (obrigatório)
  description?: string;     // Descrição opcional
  price: number;             // Preço em número decimal
  createdAt?: string;        // ISO 8601 – data de criação
  updatedAt?: string;        // ISO 8601 – data da última atualização
}
```

### Endpoints
| Método | URL | Descrição | Corpo da Requisição | Resposta de Sucesso |
|--------|-----|-----------|--------------------|---------------------|
| `GET` | `/api/products` | Lista todos os produtos | — | `{ data: Product[], status: 200 }` |
| `POST` | `/api/products` | Cria um novo produto | `{ name, description?, price }` | `{ data: Product, status: 201 }` |
| `GET` | `/api/products/:id` | Busca produto por ID | — | `{ data: Product, status: 200 }` |
| `PUT` | `/api/products/:id` | Atualiza produto existente | `{ name?, description?, price? }` | `{ data: Product, status: 200 }` |
| `DELETE` | `/api/products/:id` | Remove produto | — | `204 No Content` |

---

## Exemplos de Uso com `curl`

### Listar todos os produtos
```bash
curl -X GET http://localhost:3000/api/products
```

### Criar um novo produto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Camiseta","description":"Algodão 100%","price":49.90}'
```

### Buscar produto por ID
```bash
curl -X GET http://localhost:3000/api/products/12345
```

### Atualizar um produto
```bash
curl -X PUT http://localhost:3000/api/products/12345 \
  -H "Content-Type: application/json" \
  -d '{"price":59.90}'
```

### Deletar um produto
```bash
curl -X DELETE http://localhost:3000/api/products/12345
```

---

## Estrutura do Projeto
```
frontend/
├─ pages/
│   └─ api/
│       └─ products/          # Rotas API (CRUD)
├─ components/
│   └─ ProductForm.tsx       # Formulário reutilizável
├─ src/
│   └─ types/index.ts       # Tipagens compartilhadas
├─ public/                  # Assets estáticos
├─ next.config.js
├─ package.json
└─ README.md
```

---

## Contribuição

Sinta‑se à vontade para abrir *issues* e enviar *pull requests*. Para contribuir:
1. Fork o repositório.
2. Crie uma branch (`git checkout -b feature/minha-feature`).
3. Commit suas mudanças e abra um PR.

---

## Licença

Este projeto está licenciado sob a licença **MIT**.
