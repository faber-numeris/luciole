# Luciole
Pragmatic Tracking System

## Project Structure

Luciole is a full-stack tracking system with the following core modules:

### 📱 mobile
Native Android application built with **Kotlin**.
- Native Android app
- Modern Jetpack Compose UI
- gRPC client for backend communication

[View mobile app](./mobile/android/)

### 🚀 backend
Backend API server built with **Go**.
- gRPC API
- PostgreSQL database
- Redis caching layer
- High-performance Go backend

[View backend README](./backend/README.md)

## Development Environment

Both modules are optimized for development on **Linux**:
- **Android Studio** for Kotlin Android development
- **GoLand** or **IntelliJ IDEA** for Go backend development

## Quick Start

### Prerequisites
- Android Studio (for mobile app development)
- JDK 17+ (for Android development)
- Go 1.21+ (for backend)
- PostgreSQL 15+ (for database)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/faber-numeris/luciole.git
   cd luciole
   ```

2. **Set up the backend**
   ```bash
   cd backend
   # Follow instructions in backend/README.md
   ```

3. **Set up the mobile app**
   ```bash
   cd mobile/android
   # Open the project in Android Studio
   # Build and run the app
   ```

## Documentation

- [Mobile App](./mobile/android/) - Native Kotlin Android app
- [Backend Setup Guide](./backend/README.md) - Complete Go backend setup

## Contributing

Please read the individual module READMEs for specific contribution guidelines.

## License

[Add license information here]
