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
        val parts = hostAndPort.split(":")
        val host = parts[0]
        val port = if (parts.size > 1) parts[1].toInt() else if (isSecure) 443 else 80

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
        channel?.shutdown()?.awaitTermination(5, TimeUnit.SECONDS)
        stub = null
    }
}