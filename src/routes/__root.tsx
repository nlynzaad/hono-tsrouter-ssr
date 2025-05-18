import {createRootRoute, Link, Outlet} from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (<div>Not Found</div>)
});

export function RootLayout() {
  return (
    <div>
      <header>
        <nav>
          <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: '1rem' }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
