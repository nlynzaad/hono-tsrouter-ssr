import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/users/')({
  component: UsersPage,
  loader: async () => {
    // Simulate fetching users data
    return {
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ],
    };
  },
});

function UsersPage() {
  const { users } = Route.useLoaderData();
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to="/users/$userId" params={{ userId: String(user.id) }}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
