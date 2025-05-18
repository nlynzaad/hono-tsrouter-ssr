import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import {createRequestHandler, defaultStreamHandler} from "@tanstack/react-start/server";
import {createRouter} from "~/router";

const app = new Hono();

// Serve static assets
app.use('/assets/*', serveStatic({ root: './dist/client' }));

app.get('/test', c => {
	return c.text('test');
});

// Handle all other routes with SSR
app.get('*', async (c) => {
	return createRequestHandler({
		createRouter,
		request: c.req.raw
	})(defaultStreamHandler)
});

export default app;
