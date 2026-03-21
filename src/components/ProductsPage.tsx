import React, { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products';
import { Product, HttpStatus } from '../types';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const fetchProducts = async () => {
    try {
      const { data, status } = await getProducts();
      if (status === HttpStatus.OK) {
        setProducts(data);
      } else {
        setError('Falha ao carregar produtos');
      }
    } catch (e) {
      setError('Erro inesperado ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async () => {
    if (!newName || !newPrice) return;
    const payload = { name: newName, price: Number(newPrice) } as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
    const { data, status } = await createProduct(payload);
    if (status === HttpStatus.Created && data) {
      setProducts((prev) => [...prev, data]);
      setNewName('');
      setNewPrice('');
    } else {
      setError('Erro ao criar produto');
    }
  };

  const handleDelete = async (id: string) => {
    const { status } = await deleteProduct(id);
    if (status === HttpStatus.NoContent || status === HttpStatus.OK) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      setError('Erro ao remover produto');
    }
  };

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Produtos</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id} className="mb-2 flex justify-between items-center">
            <span>
              {p.name} - R${' '}{p.price.toFixed(2)}
            </span>
            <button
              className="text-red-500"
              onClick={() => handleDelete(p.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="font-medium mb-2">Adicionar Produto</h3>
        <input
          type="text"
          placeholder="Nome"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-1 mr-2"
        />
        <input
          type="number"
          placeholder="Preço"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          className="border p-1 mr-2"
        />
        <button onClick={handleCreate} className="bg-blue-500 text-white px-2 py-1">
          Criar
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
