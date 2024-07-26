FROM node:14-alpine3.12 AS base
LABEL authors="tapnisu"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN apk add --no-cache cairo ffmpeg pango
COPY package.json pnpm-lock.yaml /app/
RUN npm install -g pnpm@7

FROM base AS os-build-deps
RUN apk add --no-cache \
    alpine-sdk \
    cairo-dev \
    libsodium-dev \
    pango-dev \
    pixman-dev \
    python3

FROM os-build-deps AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod

FROM base
COPY /src /app/src
COPY --from=prod-deps /app/node_modules /app/node_modules

CMD [ "pnpm", "run", "start" ]
