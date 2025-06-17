# EnvSync API 🚀

The REST API backend for [EnvSync Cloud](https://envsync.cloud) - seamlessly sync your environment configurations across web applications.

> **High-performance API built with modern technologies** ⚡  
> Secure, scalable, and developer-friendly backend services.

## ✨ What is EnvSync?

EnvSync keeps your `.env` files, configuration secrets, and environment variables perfectly synchronized across development, staging, and production environments.

**Key Benefits:**
- 🔒 **Secure** - End-to-end encryption for sensitive data
- ⚡ **Fast** - Real-time synchronization across environments  
- 🌐 **Web-first** - Built for modern web development workflows
- 🔧 **Developer-friendly** - RESTful API with comprehensive documentation

## 🛠️ Tech Stack

- **Hono** - Fast web framework for the edge
- **Bun** - JavaScript runtime and package manager
- **TypeScript** - Type-safe development
- **ESBuild** - Ultra-fast bundler
- **PostgreSQL** - Reliable relational database
- **Kysely** - Type-safe SQL query builder
- **Auth0** - Authentication and authorization
- **Redis** - Caching and session storage
- **AWS S3** - File storage
- **AWS SES** - Email services
- **Docker** - Containerization

## 📚 API Documentation

Interactive API documentation is available at: **[https://api.envsync.cloud/docs](https://api.envsync.cloud/docs)** 📖

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Docker](https://docker.com/) - For running services locally
- [PostgreSQL](https://postgresql.org/) - Database
- [Redis](https://redis.io/) - Cache (optional)

### Installation

```bash
git clone https://github.com/EnvSync-Cloud/envsync-api.git
cd envsync-api
```

```bash
bun install
```

### Environment Setup

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
# Application
NODE_ENV=development
PORT=3000
DB_LOGGING=false
DB_AUTO_MIGRATE=false
DATABASE_SSL=false

# Database configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=envsync

# S3 configuration
S3_BUCKET=envsync-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY=your-access-key
S3_SECRET_KEY=your-secret-key
S3_BUCKET_URL=https://your-bucket.s3.amazonaws.com
S3_ENDPOINT=https://s3.us-east-1.amazonaws.com

# Redis configuration
CACHE_ENV=development
REDIS_URL=redis://localhost:6379

# SES configuration
SES_REGION=us-east-1
SES_ACCESS_KEY=your-ses-access-key
SES_SECRET_KEY=your-ses-secret-key
SES_FROM_EMAIL=noreply@envsync.cloud

# Auth0 configuration
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_CLI_CLIENT_ID=your-cli-client-id
AUTH0_CLI_CLIENT_SECRET=your-cli-client-secret
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_MANAGEMENT_CLIENT_ID=your-management-client-id
AUTH0_MANAGEMENT_CLIENT_SECRET=your-management-client-secret

# Auth0 Redirect URIs
AUTH0_CLI_REDIRECT_URI=http://localhost:8080/callback
AUTH0_WEB_REDIRECT_URI=http://localhost:3000/callback
AUTH0_CLI_CALLBACK_URL=http://localhost:8080/callback
AUTH0_WEB_CALLBACK_URL=http://localhost:3000/callback
AUTH0_API_REDIRECT_URI=http://localhost:3001/callback
```

### Development with Docker Compose

Start the development environment:

```bash
docker-compose up -d
```

This will start:
- 🐘 PostgreSQL database
- 🔴 Redis cache
- 📧 Local email service (optional)

### Run the API

```bash
bun run dev
```

The API will be available at `http://localhost:3000` 🎉

## 📝 Available Scripts

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun start

# Run database migrations
bun db
```

## 📁 Project Structure

```
envsync-api/
├── src/
│   ├── routes/         # API route handlers
│   ├── controllers/    # Business logic controllers
│   ├── middleware/     # Custom middleware
│   ├── services/       # Business logic services
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript definitions
│   ├── app/            # Entry point
│   └── libs/           # Libraries and helpers
└── docker-compose.yml  # Development services
```

## 🔧 Configuration

### Required Environment Variables

| Category | Variable | Description |
|----------|----------|-------------|
| **App** | `NODE_ENV` | Environment mode |
| **App** | `PORT` | Server port |
| **Database** | `DATABASE_HOST` | PostgreSQL host |
| **Database** | `DATABASE_PORT` | PostgreSQL port |
| **Database** | `DATABASE_USER` | Database username |
| **Database** | `DATABASE_PASSWORD` | Database password |
| **Database** | `DATABASE_NAME` | Database name |
| **S3** | `S3_BUCKET` | AWS S3 bucket name |
| **S3** | `S3_ACCESS_KEY` | AWS access key |
| **S3** | `S3_SECRET_KEY` | AWS secret key |
| **Redis** | `REDIS_URL` | Redis connection URL |
| **Auth0** | `AUTH0_DOMAIN` | Auth0 domain |
| **Auth0** | `AUTH0_CLIENT_ID` | Auth0 client ID |
| **SES** | `SES_FROM_EMAIL` | Email sender address |

## 🐳 Docker Deployment

### Run with Docker Compose

```bash
docker-compose -f docker-compose.yml up -d
```

## 🔒 Authentication

This API uses **Auth0** for authentication and authorization:

- 🔑 **JWT tokens** for API access
- 👥 **Role-based access control** (RBAC)
- 🔐 **OAuth 2.0** for third-party integrations
- 📱 **Multi-factor authentication** support

## 🌟 EnvSync Ecosystem

- **[envsync-cli](https://github.com/EnvSync-Cloud/envsync-cli)** - Command line interface
- **[envsync-web](https://github.com/EnvSync-Cloud/envsync-web)** - Web dashboard for managing configurations
- **envsync-api** - REST API and backend services (this repo)
- **[envsync-landing](https://github.com/EnvSync-Cloud/envsync-landing)** - Landing page

## 🤝 Contributing

We're building the future of environment management! 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support & Community

- 📧 **Email:** hi@envsync.com
- 📖 **Blog:** [docs.envsync.com](https://blog.envsync.com)
- 🐛 **Issues:** [GitHub Issues](https://github.com/EnvSync-Cloud/envsync-api/issues)

---

**Making environment configuration simple, secure, and synchronized** 🌟

Built with ❤️ by the EnvSync team
