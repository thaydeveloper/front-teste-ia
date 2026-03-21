import type { NextPage } from 'next';
import Head from 'next/head';
import { User } from '../src/types';

const Home: NextPage = () => {
  const dummyUser: User = { id: '1', name: 'OpenClaw', email: 'openclat@example.com' };
  return (
    <>
      <Head>
        <title>Product CRUD</title>
      </Head>
      <main className="p-4">
        <h1 className="text-2xl font-bold">Bem-vindo, {dummyUser.name}!</h1>
        <p className="mt-2">Esta é a página inicial do frontend.</p>
      </main>
    </>
  );
};

export default Home;
