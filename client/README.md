# Usage
## Build via Webpack:
```
npm run build:dev # build quick, provide extra dev info, etc

# or

npm run build:prod # remove dead code, minify, etc
```

## Build via Webpack w/hot module loading:
```
npm run dev:server
```

# FAQ

## What's up with hot module reloading?

Basically, `webpack-serve` is a smart static asset server for use during
development if you want hot module loading. The development server is smart in
that it communicates changes (module updates) to a hot loader client that's
listening for changes via websockets.

If you just want to do a quick build, `build:dev` or `build:prod` is a better
alternative.

The hot module reloading uses two main packages:

1. [`react-hot-loader`](https://github.com/gaearon/react-hot-loader)
	- Hooks into babel, communicates with the development server (which serves the modules), and wraps the React app to orchestrate the updates.
2. [`webpack-serve`](https://github.com/webpack-contrib/webpack-serve)
	- Serves webpack builds and communicates with the hot loader client (which consumes the modules).

> Note: you may have to manually add HTTPS cert security exceptions for both the `../server` and also for the `websockets` connection used by `webpack-serve`.
