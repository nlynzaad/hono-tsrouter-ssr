import { serve } from 'bun';
import app from '../entry-server';

const PORT = process.env.PORT || 3030;

console.log(`Server running at http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: Number(PORT),
});
