import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$userId')({
  component: UserPage,
  loader: async ({ params }) => {
    // Simulate fetching user data
    const userId = parseInt(params.userId);
    const users = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ];

    const user = users.find(u => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    return { user };
  },
});

function UserPage() {
  const { user } = Route.useLoaderData();

  return (
    <div>
      <h1>User: {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}
