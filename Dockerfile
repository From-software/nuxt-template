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
COPY --from=builder /build/.output ./.output
LABEL "org.opencontainers.image.source"="https://github.com/From-software/nuxt-template"
CMD ["node", ".output/server/index.mjs"]