import UserList from '../components/UserList';

export default function Home() {
  return (
    <main className="min-h-screen p-8 text-base-content">
      <div className="max-w-xl mx-auto">
        <UserList />
      </div>
    </main>
  );
}
