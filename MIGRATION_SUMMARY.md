# Migration from Wire gRPC Client to Classic gRPC Client

## Overview
This document summarizes the changes made to replace Square's Wire gRPC client with the classic gRPC Java/Kotlin client in the Luciole Android application.

## Changes Made

### 1. Dependency Updates (`mobile/android/gradle/libs.versions.toml`)

**Removed:**
- `wire = "5.4.0"` version
- `wire-runtime` library
- `wire-grpc-client` library
- `wire` plugin

**Added:**
- `protobuf = "4.29.3"` - Protocol Buffers runtime
- `grpc = "1.71.0"` - gRPC Java libraries
- `grpc-kotlin = "1.5.0"` - gRPC Kotlin coroutine stubs
- `protobuf-plugin = "0.9.4"` - Protobuf Gradle plugin
- `protobuf-javalite` - Lightweight protobuf for Android
- `protobuf-kotlin-lite` - Kotlin protobuf lite for Android
- `grpc-okhttp` - gRPC OkHttp transport
- `grpc-protobuf-lite` - gRPC protobuf lite for Android
- `grpc-stub` - gRPC stub library
- `grpc-kotlin-stub` - gRPC Kotlin coroutine stubs
- Protobuf compiler artifacts for code generation

### 2. Build Configuration Updates

#### Root `build.gradle.kts`
- Replaced `alias(libs.plugins.wire) apply false` with `alias(libs.plugins.protobuf) apply false`

#### App `build.gradle.kts`
**Removed Wire Configuration:**
```kotlin
wire {
    sourcePath {
        srcDir("proto")
    }
    kotlin {
        android = true
        javaInterop = true
    }
}
```

**Added Protobuf Configuration:**
```kotlin
protobuf {
    protoc {
        artifact = libs.protobuf.protoc.get().toString()
    }
    plugins {
        create("java") { ... }
        create("grpc") { ... }
        create("grpckt") { ... }
    }
    generateProtoTasks {
        all().forEach { task ->
            task.plugins {
                create("java") { option("lite") }
                create("grpc") { option("lite") }
                create("grpckt") { option("lite") }
            }
            task.builtins {
                create("kotlin") { option("lite") }
            }
        }
    }
}

android {
    ...
    sourceSets {
        getByName("main") {
            proto {
                srcDir("proto")
            }
        }
    }
}
```

**Dependencies Updated:**
- Replaced Wire dependencies with gRPC/Protobuf lite versions suitable for Android

### 3. Code Changes

#### `grpcclient.kt`
**Before (Wire):**
```kotlin
import com.squareup.wire.GrpcClient
import okhttp3.OkHttpClient
import okhttp3.Protocol

interface IGRPCClient {
    suspend fun connect() : TrackingServiceClient
}

class GRPCClient @Inject constructor() : IGRPCClient {
    override suspend fun connect(): TrackingServiceClient {
        val grpcClient = GrpcClient.Builder()
            .client(OkHttpClient.Builder()
                .protocols(listOf(Protocol.H2_PRIOR_KNOWLEDGE))
                .build())
            .baseUrl(BuildConfig.SERVER_URL)
            .build()
        return grpcClient.create(service = TrackingServiceClient::class)
    }
}
```

**After (Classic gRPC):**
```kotlin
import io.grpc.ManagedChannel
import io.grpc.ManagedChannelBuilder
import java.util.concurrent.TimeUnit

interface IGRPCClient {
    suspend fun connect() : TrackingServiceGrpcKt.TrackingServiceCoroutineStub
    fun shutdown()
}

class GRPCClient @Inject constructor() : IGRPCClient {
    private var channel: ManagedChannel? = null
    private var stub: TrackingServiceGrpcKt.TrackingServiceCoroutineStub? = null

    override suspend fun connect(): TrackingServiceGrpcKt.TrackingServiceCoroutineStub {
        // Return existing stub if already connected
        if (stub != null && channel?.isShutdown == false) {
            return stub!!
        }

        // Parse URL and create channel
        val url = BuildConfig.SERVER_URL
        val isSecure = url.startsWith("https://")
        val hostAndPort = url.removePrefix("http://").removePrefix("https://")
        val parts = hostAndPort.split(":")
        val host = parts[0]
        val port = if (parts.size > 1) parts[1].toInt() else if (isSecure) 443 else 80

        val channelBuilder = ManagedChannelBuilder.forAddress(host, port)
        if (!isSecure) {
            channelBuilder.usePlaintext()
        }
        
        channel = channelBuilder.build()
        stub = TrackingServiceGrpcKt.TrackingServiceCoroutineStub(channel!!)
        return stub!!
    }

    override fun shutdown() {
        channel?.shutdown()?.awaitTermination(5, TimeUnit.SECONDS)
        stub = null
    }
}
```

#### Protobuf Message Construction Updates

**Wire Builder Pattern:**
```kotlin
val position = Position.Builder()
    .coordinate(coordinate = Coordinate(latitude, longitude))
    .build()
```

**Standard Protobuf Builder Pattern:**
```kotlin
val position = Position.newBuilder()
    .setCoordinate(
        Coordinate.newBuilder()
            .setLatitude(latitude)
            .setLongitude(longitude)
            .build()
    )
    .build()
```

**Files Updated:**
- `TrackedObjectsRepository.kt`
- `TrackedObjectsViewModel.kt`

#### Protobuf Field Access Updates

**Wire (nullable fields):**
```kotlin
if (obj.position.coordinate == null) { ... }
val lat = currentPosition.coordinate?.latitude ?: defaultValue
```

**Standard Protobuf (non-nullable with has* methods):**
```kotlin
if (!obj.position.hasCoordinate()) { ... }
val lat = currentPosition.coordinate.latitude
```

**File Updated:**
- `MainActivity.kt`

## Benefits of the Migration

1. **Standard Implementation**: Uses the official gRPC Java/Kotlin libraries maintained by the gRPC team
2. **Better Compatibility**: Works seamlessly with standard gRPC tooling and ecosystem
3. **Coroutine Support**: Native Kotlin coroutine support through gRPC Kotlin stubs
4. **Resource Management**: Proper channel lifecycle management with shutdown methods
5. **Performance**: Uses Android-optimized lite versions of protobuf for reduced binary size

## Proto File Compatibility

The existing `tracking.proto` file required no changes as it already had proper Java options configured:
```protobuf
option java_package = "ca.fabernumeris.tracking.v1";
option java_multiple_files = true;
option java_outer_classname = "TrackingProto";
```

## Testing Notes

Due to network restrictions in the build environment (dl.google.com not accessible), the changes could not be built and tested. However:

1. All code changes follow standard gRPC Java/Kotlin patterns
2. Dependencies are correctly specified for Android (lite versions)
3. The protobuf plugin configuration matches standard Android gRPC setups
4. The migration pattern is well-documented and widely used

## Next Steps for Testing

When the network issue is resolved:

1. Run `./gradlew clean build` to generate protobuf/gRPC classes
2. Verify that generated classes include:
   - `TrackingServiceGrpcKt.TrackingServiceCoroutineStub`
   - Message builders (`.newBuilder()`, `.setXxx()` methods)
   - `hasXxx()` methods for optional fields
3. Run the application and verify gRPC connectivity works
4. Test both debug (localhost:50051) and release (api.luciole.ca) server URLs

## Rollback

If issues arise, the original Wire implementation can be restored by reverting to commit `527f047`.
