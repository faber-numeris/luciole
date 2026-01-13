package ca.fabernumeris.luciole.gprpc

import ca.fabernumeris.luciole.BuildConfig
import ca.fabernumeris.tracking.v1.TrackingServiceGrpcKt
import io.grpc.ManagedChannel
import io.grpc.ManagedChannelBuilder
import java.util.concurrent.TimeUnit
import javax.inject.Inject


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

        // Parse the server URL to extract host and port
        val url = BuildConfig.SERVER_URL
        val isSecure = url.startsWith("https://")
        val hostAndPort = url.removePrefix("http://").removePrefix("https://")
        
        // Split by last colon to handle IPv6 addresses
        val lastColonIndex = hostAndPort.lastIndexOf(':')
        val host: String
        val port: Int
        
        if (lastColonIndex > 0 && lastColonIndex < hostAndPort.length - 1) {
            host = hostAndPort.substring(0, lastColonIndex)
            try {
                port = hostAndPort.substring(lastColonIndex + 1).toInt()
            } catch (e: NumberFormatException) {
                throw IllegalArgumentException("Invalid port in SERVER_URL: $url", e)
            }
        } else {
            host = hostAndPort
            port = if (isSecure) 443 else 80
        }

        // Create a managed channel
        val channelBuilder = ManagedChannelBuilder.forAddress(host, port)
        
        if (!isSecure) {
            channelBuilder.usePlaintext()
        }
        
        channel = channelBuilder.build()

        // Create and return the stub
        stub = TrackingServiceGrpcKt.TrackingServiceCoroutineStub(channel!!)
        return stub!!
    }

    override fun shutdown() {
        channel?.let {
            it.shutdown()
            if (!it.awaitTermination(5, TimeUnit.SECONDS)) {
                // Force shutdown if graceful shutdown times out
                it.shutdownNow()
                it.awaitTermination(1, TimeUnit.SECONDS)
            }
        }
        stub = null
    }
}