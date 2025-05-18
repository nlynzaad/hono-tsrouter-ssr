import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is a demonstration of streaming SSR with Tanstack Router, Hono and Bun. Updated</p>
    </div>
  );
}
