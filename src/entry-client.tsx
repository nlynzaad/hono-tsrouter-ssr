import { hydrateRoot } from 'react-dom/client'

import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'
import {EventSourceProvider} from "react-sse-hooks";

const router = createRouter()

hydrateRoot(document,
	<EventSourceProvider>
		<StartClient router={router} />
	</EventSourceProvider>)
