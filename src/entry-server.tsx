import {createRequestHandler, defaultStreamHandler} from "@tanstack/react-start/server";
import {createRouter} from "~/router";

export function render(request: Request) {
	return createRequestHandler({
		createRouter,
		request
	})(defaultStreamHandler)
}
