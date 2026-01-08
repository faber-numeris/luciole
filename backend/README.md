<div align="center">
  <img src="./assets/firefly-logo.svg" alt="Luciole Firefly Logo" width="150"/>
</div>

# Luciole Backend

Backend API server for the Luciole Pragmatic Tracking System built with Go.

## Tech Stack

- **Go** 1.21+ - Primary programming language
- **Gin** / **Echo** / **Chi** - HTTP web framework (to be chosen)
- **PostgreSQL** - Primary database
- **Redis** - Caching layer
- **JetBrains GoLand** (recommended IDE)

## Prerequisites

- **Go** 1.21 or higher
- **PostgreSQL** 15+ (for local development)
- **Redis** 7+ (optional, for caching)
- **Make** (for build automation)
- **JetBrains GoLand** (recommended IDE)

## Development Setup on Linux with JetBrains

### 1. Install Go

```bash
# Download and install Go
wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz

# Add to PATH in ~/.bashrc or ~/.zshrc
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$PATH:$GOPATH/bin' >> ~/.bashrc
source ~/.bashrc

# Verify installation
go version
```

### 2. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create development database
sudo -u postgres psql
CREATE DATABASE luciole_dev;
CREATE USER luciole_user WITH PASSWORD 'luciole_password';
GRANT ALL PRIVILEGES ON DATABASE luciole_dev TO luciole_user;
\q
```

### 3. Install Redis (Optional)

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install redis-server

# Start Redis service
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Test Redis connection
redis-cli ping
```

### 4. Project Setup

```bash
cd luciole-backend

# Initialize Go module (if not already done)
go mod init github.com/faber-numeris/luciole/luciole-backend

# Download dependencies
go mod download

# Install development tools
go install github.com/cosmtrek/air@latest           # Live reload
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest  # Linter
go install github.com/swaggo/swag/cmd/swag@latest  # API documentation
```

### 5. Set Up JetBrains GoLand

#### Install GoLand
```bash
# Download from JetBrains website or use JetBrains Toolbox
# https://www.jetbrains.com/go/download/#section=linux

# Or using snap
sudo snap install goland --classic
```

#### Configure GoLand for Go Development

1. **Open the project**: `File > Open` and select the `luciole-backend` directory

2. **Configure Go SDK**:
   - Go to `Settings > Go > GOROOT`
   - Select your Go installation (usually `/usr/local/go` or auto-detected)
   - Verify `GOPATH` is set correctly (usually `~/go`)

3. **Enable Go Modules**:
   - Go to `Settings > Go > Go Modules`
   - Check "Enable Go modules integration"
   - Set "Proxy" to `https://proxy.golang.org` (or leave default)

4. **Configure Code Style**:
   - Go to `Settings > Editor > Code Style > Go`
   - Use `gofmt` formatting (default)
   - Enable imports optimization

5. **Install Plugins** (if needed):
   - Database Tools and SQL (usually built-in)
   - .env files support
   - Makefile support

6. **Configure Database Connection**:
   - Open `Database` tool window (`View > Tool Windows > Database`)
   - Click `+` > `Data Source` > `PostgreSQL`
   - Configure connection:
     - Host: `localhost`
     - Port: `5432`
     - Database: `luciole_dev`
     - User: `luciole_user`
     - Password: `luciole_password`
   - Test connection and click OK

### 6. Environment Configuration

Create a `.env` file in the project root:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=luciole_user
DB_PASSWORD=luciole_password
DB_NAME=luciole_dev
DB_SSL_MODE=disable

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Server
SERVER_PORT=8080
SERVER_HOST=0.0.0.0
ENV=development

# JWT
JWT_SECRET=your-secret-key-here

# Logging
LOG_LEVEL=debug
```

### 7. Running the Application

#### Using Go directly

```bash
# Run the application
go run main.go

# Build the application
go build -o bin/luciole-backend

# Run the binary
./bin/luciole-backend
```

#### Using Air for live reload (recommended for development)

```bash
# Install Air if not already installed
go install github.com/cosmtrek/air@latest

# Run with Air
air

# Or with custom config
air -c .air.toml
```

#### Using Make (if Makefile is present)

```bash
# Run the application
make run

# Build the application
make build

# Run tests
make test

# Run linter
make lint
```

### 8. Using GoLand Run Configurations

Create custom run configurations in GoLand:

1. **Go to**: `Run > Edit Configurations`
2. **Click** the `+` button and select `Go Build`
3. **Configure**:
   - Name: "Run Backend"
   - Run kind: `Package`
   - Package path: `github.com/faber-numeris/luciole/luciole-backend`
   - Working directory: Select project root
   - Environment: Load from `.env` file or add manually
   - Click OK

You can now run the app directly from GoLand using the run button.

## Project Structure

```
luciole-backend/
├── cmd/
│   └── server/           # Application entry points
│       └── main.go
├── internal/             # Private application code
│   ├── api/              # API handlers and routes
│   ├── models/           # Data models
│   ├── services/         # Business logic
│   ├── repository/       # Database access layer
│   ├── middleware/       # HTTP middlewares
│   └── config/           # Configuration
├── pkg/                  # Public libraries
│   └── utils/            # Utility functions
├── migrations/           # Database migrations
├── scripts/              # Build and deployment scripts
├── docs/                 # API documentation
├── tests/                # Integration tests
├── go.mod                # Go module definition
├── go.sum                # Go module checksums
├── Makefile              # Build automation
├── .env.example          # Example environment variables
└── README.md             # This file
```

## Available Commands

```bash
# Run the application
go run main.go

# Build the application
go build -o bin/luciole-backend

# Run tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Run linter
golangci-lint run

# Format code
go fmt ./...

# Tidy dependencies
go mod tidy

# Generate API documentation (if using swag)
swag init
```

## Useful JetBrains GoLand Shortcuts

- `Ctrl + Shift + A` - Find action
- `Ctrl + Alt + L` - Reformat code
- `Ctrl + Alt + O` - Optimize imports
- `Shift + Shift` - Search everywhere
- `Alt + Enter` - Show intention actions and quick fixes
- `Ctrl + Shift + T` - Create/navigate to test
- `Ctrl + Shift + F10` - Run file/test
- `Shift + F10` - Run
- `Shift + F9` - Debug
- `Ctrl + F5` - Rerun

## Debugging in GoLand

1. **Set breakpoints**: Click in the gutter next to the line number
2. **Debug mode**: Click the debug icon or press `Shift + F9`
3. **Debug panel**: Use the debugger panel to step through code, inspect variables, etc.
4. **Evaluate expressions**: Right-click and select "Evaluate Expression" while debugging

## Testing

```bash
# Run all tests
go test ./...

# Run tests with verbose output
go test -v ./...

# Run tests with coverage
go test -cover ./...

# Generate coverage report
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out

# Run specific test
go test -run TestFunctionName

# Run tests in specific package
go test ./internal/api/...
```

## Database Migrations

```bash
# Install migrate tool
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# Create new migration
migrate create -ext sql -dir migrations -seq create_users_table

# Run migrations
migrate -path migrations -database "postgres://luciole_user:luciole_password@localhost:5432/luciole_dev?sslmode=disable" up

# Rollback migration
migrate -path migrations -database "postgres://luciole_user:luciole_password@localhost:5432/luciole_dev?sslmode=disable" down
```

## Linting

```bash
# Run golangci-lint
golangci-lint run

# Run with auto-fix
golangci-lint run --fix

# Run specific linters
golangci-lint run --enable=govet,errcheck,staticcheck
```

## Docker Support (Optional)

```bash
# Build Docker image
docker build -t luciole-backend:latest .

# Run container
docker run -p 8080:8080 --env-file .env luciole-backend:latest

# Using docker-compose
docker-compose up -d
```

## Troubleshooting

### Clear Go module cache
```bash
go clean -modcache
```

### Update dependencies
```bash
go get -u ./...
go mod tidy
```

### Fix import issues in GoLand
- `File > Invalidate Caches > Invalidate and Restart`

### PostgreSQL connection issues
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

## Additional Resources

- [Go Documentation](https://go.dev/doc/)
- [Go by Example](https://gobyexample.com/)
- [GoLand Documentation](https://www.jetbrains.com/help/go/)
- [Effective Go](https://go.dev/doc/effective_go)
- [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)

## API Documentation

Once the server is running, API documentation is available at:
- Swagger UI: `http://localhost:8080/swagger/index.html`
- ReDoc: `http://localhost:8080/redoc`

## Contributing

Please follow the project's coding standards and ensure all tests pass before submitting pull requests.

## License

See the main project LICENSE file for details.
