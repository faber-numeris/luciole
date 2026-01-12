package ca.fabernumeris.luciole.gprpc

import ca.fabernumeris.tracking.v1.TrackingServiceClient
import com.squareup.wire.GrpcClient
import okhttp3.OkHttpClient
import okhttp3.Protocol


// TODO: Consider using BuildConfig for different environments
const val serverUrl = "http://localhost:50051"

interface IGRPCClient {
    suspend fun connect() : TrackingServiceClient
}


class GRPCClient : IGRPCClient {
    override suspend fun connect(): TrackingServiceClient {
        val grpcClient = GrpcClient.Builder()
            .client(
                OkHttpClient.Builder()
                    .protocols(listOf(Protocol.H2_PRIOR_KNOWLEDGE))
                    .build())
            .baseUrl(serverUrl)
            .build()
        val trackingServiceClient = grpcClient.create(service = TrackingServiceClient::class)

        return trackingServiceClient
    }
}