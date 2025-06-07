import {Hono} from "hono";
import {serveStatic} from "hono/bun";
import {stream, streamSSE} from "hono/streaming";
import {statSync, readdirSync} from 'node:fs'
import {join, resolve} from 'node:path';
import {render} from '~/entry-server';
import type {StatusCode} from "hono/utils/http-status";

const app = new Hono();

if (import.meta.env.PROD) {
	const clientPath = resolve(`${import.meta.dir}/../client`);

	const files = readdirSync(clientPath);

	files.map(file => {
		if (statSync(join(clientPath, file)).isDirectory()) {
			app.use(`/${file}/*`, serveStatic({
				root: clientPath,
			}))
		}
	})
}

app.get('/api/serverTime', async (c) => {
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
	c.header('Transfer-Encoding', 'chunked')

	res.headers.forEach((value, name) => {
			c.header(name, value)
	})

	return stream(c, async (stream) => {
		await stream.pipe(res.body!)
	})
})

export default app;
