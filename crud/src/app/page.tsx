import UserList from '../components/UserList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="max-w-xl mx-auto">
        <UserList />
      </div>
    </main>
  );
}
