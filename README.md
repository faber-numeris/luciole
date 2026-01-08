# Luciole
Pragmatic Tracking System

## Project Structure

Luciole is a full-stack tracking system with the following core modules:

### 📱 luciole-ui
Mobile application built with **React Native** and **Expo**.
- Cross-platform mobile app (iOS & Android)
- Modern React Native architecture
- Expo for rapid development and deployment

[View luciole-ui README](./luciole-ui/README.md)

### 🚀 luciole-backend
Backend API server built with **Go**.
- RESTful API
- PostgreSQL database
- Redis caching layer
- High-performance Go backend

[View luciole-backend README](./luciole-backend/README.md)

## Development Environment

Both modules are optimized for development on **Linux** using the **JetBrains ecosystem**:
- **WebStorm** or **IntelliJ IDEA Ultimate** for React Native development
- **GoLand** for Go backend development

## Quick Start

### Prerequisites
- Node.js 18+ (for luciole-ui)
- Go 1.21+ (for luciole-backend)
- PostgreSQL 15+ (for database)
- JetBrains IDE (WebStorm/GoLand)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/faber-numeris/luciole.git
   cd luciole
   ```

2. **Set up the backend**
   ```bash
   cd luciole-backend
   # Follow instructions in luciole-backend/README.md
   ```

3. **Set up the mobile app**
   ```bash
   cd luciole-ui
   # Follow instructions in luciole-ui/README.md
   ```

## Documentation

- [Frontend Setup Guide](./luciole-ui/README.md) - Complete React Native setup with Expo
- [Backend Setup Guide](./luciole-backend/README.md) - Complete Go backend setup

## Contributing

Please read the individual module READMEs for specific contribution guidelines.

## License

[Add license information here]
