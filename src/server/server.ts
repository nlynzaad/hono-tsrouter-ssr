import {render} from '~/entry-server';
import {Hono} from "hono";

import {stream, streamSSE} from "hono/streaming";
import {serveStatic} from "hono/bun";
import * as path from "node:path";
import {fileURLToPath} from "url";
import {dirname} from "path";
import type {StatusCode} from "hono/utils/http-status";

const app = new Hono();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (import.meta.env.PROD) {
	app.use('*', serveStatic({
		root: path.resolve(__dirname, '../client'),
	}))
}

app.get('/test', async (c) => {
	return c.json({test: 'test'})
})

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

app.get('*', async (c) => {
	const res = await render(c.req.raw);
	c.status(res.status as StatusCode)

	res.headers.forEach((value, name) => {
		//the content-type of text/html during dev with vite dev server seems to break the streaming ssr and hydration.
		if (!import.meta.env.PROD && name.toLowerCase() === 'content-type' && value.startsWith('text/html')) {
			c.header(name, 'charset=utf-8')
		} else {
			c.header(name, value)
		}
	})

	return stream(c, async (stream) => {
		await stream.pipe(res.body!)
	})
})

export default app;
