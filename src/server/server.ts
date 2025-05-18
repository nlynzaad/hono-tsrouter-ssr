import {serve} from 'bun';
import {render} from '~/entry-server';
import {Hono} from "hono";
import {serveStatic} from "hono/bun";
import {streamSSE} from "hono/streaming";

const PORT = process.env.PORT || 3030;

const app = new Hono();

// Serve static assets
app.use('/assets/*', serveStatic({root: './dist/client'}));

app.get('/api/servertime', async (c) => {
	let id = 0
	return streamSSE(c, async (stream) => {
		let isOpen = true;
		while (isOpen) {
			const message = `It is ${new Date().toISOString()}`

			await stream.writeSSE({
				data: message,
				event: 'time-update',
				id: String(id++),
			})

			if (stream.aborted || stream.closed) {
				isOpen = false;
				break;
			}

			await stream.sleep(1000)
		}
		await stream.close();
	})
})

// Handle all other routes with SSR
app.get('*', async (c) => {
	return await render(c.req.raw)
});

if (process.env.NODE_ENV === 'production') {
	console.log(`Server running at http://localhost:${PORT}`);

	serve({
		fetch: app.fetch,
		port: Number(PORT),
	})
}

export default app;
