# Base image with common dependencies
FROM node:18-alpine AS base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000
# Build stage
FROM base AS builder
COPY . .
RUN yarn
RUN npm run build
# Production stage
FROM base AS production
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
CMD ["npm", "run","dev"]
# # Development stage
# FROM base AS dev
# ENV NODE_ENV=development
# RUN npm install
# COPY . .
# CMD ["npm", "run", "dev"]