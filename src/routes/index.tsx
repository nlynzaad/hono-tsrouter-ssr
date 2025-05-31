import {Await, createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	loader: () => ({
		date: new Date().toString(),
		deferred: new Promise<{ date: string }>((r) =>
			setTimeout(() => r({ date: new Date().toString() }), 2500),
		),
	}),
	component: IndexComponent,
})

function IndexComponent() {
	const data = Route.useLoaderData()

	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<p>Data: {data.date}</p>
			<Await promise={data.deferred} fallback="Loading...">
				{(data) => <p>Deferred: {data.date}</p>}
			</Await>
		</div>
	)
}
