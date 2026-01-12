package ca.fabernumeris.luciole.gprpc

import ca.fabernumeris.luciole.BuildConfig
import ca.fabernumeris.tracking.v1.TrackingServiceClient
import com.squareup.wire.GrpcClient
import okhttp3.OkHttpClient
import okhttp3.Protocol


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
            .baseUrl(BuildConfig.SERVER_URL)
            .build()
        val trackingServiceClient = grpcClient.create(service = TrackingServiceClient::class)

        return trackingServiceClient
    }
}