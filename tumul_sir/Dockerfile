# Frontend build
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Inject Vite env at build time (from --build-arg)
ARG VITE_API_BASE
ARG VITE_CONTACT_WIZARD_ENABLED
RUN printf "VITE_API_BASE=%s\nVITE_CONTACT_WIZARD_ENABLED=%s\n" "$VITE_API_BASE" "$VITE_CONTACT_WIZARD_ENABLED" > .env.production

# Build static assets
RUN npm run build

# Runtime image: serve static files, respect $PORT
FROM node:20-alpine AS runner
WORKDIR /app
RUN npm i -g serve
COPY --from=builder /app/dist ./dist
ENV PORT=8080
EXPOSE 8080
CMD ["sh","-c","serve -s dist -l tcp://0.0.0.0:${PORT}"]