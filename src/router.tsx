import { createRouter as createReactRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export function createRouter() {
	return createReactRouter({
		routeTree,
		context: {
			head: ''
		},
	})
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}
