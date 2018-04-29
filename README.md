# Technology overview
- Fastify web server
	- HTTPS enabled (with junk cert/key)
	- HTTP/2 enabled
	- HTTP/2 push enabled via [node-fastify-auto-push](https://github.com/google/node-fastify-auto-push)
		- > "It can be thought as a replacement of the [`fastify-static`](https://github.com/fastify/fastify-static) plugin that supports automatic server-push."
	- Basic server-side rendering of React via Next.js via [fastify-react](https://github.com/fastify/fastify-react)
- Webpack for client-side bundling

# Tips for use
- You'll either wanna trust the cert at `server/certs/cert.pem` (which is just from [`node-fastify-auto-push`](https://github.com/google/node-fastify-auto-push/tree/master/samples/static-page/certs)) or generate your own with `tls-keygen` (per [the advice here](https://github.com/google/node-fastify-auto-push/tree/master/samples/static-page#notes)).
	- Trusting certs can be tricky. Refer to [tls-keygen#browser-support](https://www.npmjs.com/package/tls-keygen#browser-support) for some insights for your operating system and browser.

# Credits
- https://medium.com/the-node-js-collection/node-js-can-http-2-push-b491894e1bb1
- https://github.com/google/node-fastify-auto-push
