import {createRequestHandler, defaultStreamHandler} from "@tanstack/react-start-server";
import {createRouter} from "~/router";

export async function render(request: Request) {
	return createRequestHandler({
		createRouter,
		request,
	})(defaultStreamHandler)
}
