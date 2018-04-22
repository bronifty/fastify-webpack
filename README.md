# Technology overview
- Fastify web server
	- HTTPS enabled (with junk cert/key)
	- HTTP/2 enabled
	- HTTP/2 push enabled via [node-fastify-auto-push](https://github.com/google/node-fastify-auto-push)
		- > "It can be thought as a replacement of the [`fastify-static`](https://github.com/fastify/fastify-static) plugin that supports automatic server-push."
	- Basic server-side rendering of React via Next.js via [fastify-react](https://github.com/fastify/fastify-react)
- Webpack for client-side bundling

# Credits
- https://medium.com/the-node-js-collection/node-js-can-http-2-push-b491894e1bb1
- https://github.com/google/node-fastify-auto-push
