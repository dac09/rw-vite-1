## Redwood with Vite

This is an experimental Redwood app configured to work with Vite. I'm using this to understand Vite better - and not part of any official Redwood release (yet).

To successfully run this branch you need to use Redwood contributor tools to link a special version of Redwood at this branch - https://github.com/dac09/redwood/tree/try/vite-rw

Setup the branch
```
# go to your redwood clone
cd redwood
git fetch https://github.com/dac09/redwood try/vite-rw
git checkout try/vite-rw
yarn
yarn build
```

Now in this project you can link the framework:
```
yarn rwfw project:sync
```


## SSR
There's two forms of SSR configured within this project.

1. Using `fastify-vite`: most of the code sits in `./web/infw/*` - this is what fastify-vite needs configured. "infw" because I think this stuff can sit inside the Redwood framework, and not in a users project

Use this by running `yarn dev:fastify`

2. Using a standard express server, as per Vite docs which sits in `./customVite/server.js` - this is just so that I understand the differences

Use this by running `yarn dev:ssr`

## Running without SSR
As long as the special branch of RW is linked just run `yarn rw dev`
