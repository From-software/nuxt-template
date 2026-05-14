FROM ghcr.io/dmno-dev/varlock:1.1.0 AS varlock

FROM node:24 AS builder
WORKDIR /build
COPY package*.json .
RUN npm clean-install
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:24-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=varlock /usr/local/bin/varlock /usr/local/bin/varlock
COPY --from=builder /build/.output ./.output
COPY --from=builder /build/.env.schema ./.env.schema
LABEL "org.opencontainers.image.source"="https://github.com/From-software/nuxt-template"
CMD ["varlock", "run", "--", "node", ".output/server/index.mjs"]