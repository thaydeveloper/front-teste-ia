import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/users';
import { User, HttpStatus } from '../types';

/**
 * Container da feature de usuários.
 * Exibe a lista de usuários obtida da API.
 */
const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data, status } = await getUsers();
        if (status === HttpStatus.OK && data) {
          setUsers(data);
        } else {
          setError('Falha ao carregar usuários');
        }
      } catch (e) {
        setError('Erro inesperado');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id} className="mb-2">
            <strong>{u.name}</strong> – {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
