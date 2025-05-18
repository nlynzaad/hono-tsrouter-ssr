import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the streaming SSR app with Tanstack Router, Hono, and Bun!</p>
    </div>
  );
}
