# Stage 1: Build the Vite dashboard
FROM node:22-alpine AS dashboard-builder

WORKDIR /dashboard
COPY dashboard/package*.json ./
RUN npm ci
COPY dashboard/ ./
RUN npm run build

# Stage 2: Build the Go PocketBase backend
FROM golang:1.26-alpine AS backend-builder

WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ .
RUN CGO_ENABLED=0 GOOS=linux go build -o pb_server main.go

# Stage 3: Final runtime image
FROM alpine:latest

WORKDIR /app

# Copy the PocketBase binary
COPY --from=backend-builder /app/pb_server .

# Copy the built dashboard into pb_public so PocketBase serves it
COPY --from=dashboard-builder /dashboard/dist ./pb_public

# Expose PocketBase port
EXPOSE 8090

# Serve PocketBase (serves pb_public at / automatically)
CMD ["./pb_server", "serve", "--http=0.0.0.0:8090"]
