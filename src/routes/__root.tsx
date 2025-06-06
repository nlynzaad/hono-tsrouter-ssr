import {createRootRouteWithContext, HeadContent, Link, Outlet, Scripts} from '@tanstack/react-router';
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import type {RouterContext} from "~/routerContext";

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	notFoundComponent: () => (<div>Not Found</div>),
	head: () => ({
		links: [
			{rel: 'icon', href: '/images/favicon.ico'}
		],
		scripts: [
			...!import.meta.env.PROD ? [
				{
					type: 'module',
					children: `import RefreshRuntime from "/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true`,
				},
				{
					type: 'module',
					src: '/@vite/client',
				}
			] : [],
			{
				type: 'module',
				src: import.meta.env.PROD ? '/static/client.js' : '/src/entry-client.tsx',
			},
		],
	})
});

function RootComponent() {
	// noinspection HtmlRequiredTitleElement
	return (
		<html lang="en">
			<head>
				<HeadContent/>
			</head>
			<body>
				<div className="p-2 flex gap-2 text-lg">
					<Link to="/" activeProps={{style: {font: 'font-bold'}}} activeOptions={{exact: true}}>
						Home
					</Link>{' '}
					<Link to="/users" activeProps={{style: {font: 'font-bold'}}} activeOptions={{exact: true}}>
						Users
					</Link>{' '}
					<Link to="/about" activeProps={{style: {font: 'font-bold'}}} activeOptions={{exact: true}}>
						About
					</Link>{' '}
					<Link to="/counter" activeProps={{style: {font: 'font-bold'}}} activeOptions={{exact: true}}>
						Counter
					</Link>{' '}
					<Link to="/interval" activeProps={{style: {font: 'font-bold'}}} activeOptions={{exact: true}}>
						Interval
					</Link>{' '}
					<Link to="/sseTime" activeProps={{className: 'font-bold'}} activeOptions={{exact: true}}>
						Server Time
					</Link>
				</div>
				<hr/>
				<Outlet/>
				<TanStackRouterDevtools position="bottom-right"/>
				<Scripts/>
			</body>
		</html>
	);
}
