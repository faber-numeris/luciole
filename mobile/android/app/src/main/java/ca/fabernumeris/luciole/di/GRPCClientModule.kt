package ca.fabernumeris.luciole.di

import ca.fabernumeris.luciole.BuildConfig
import ca.fabernumeris.tracking.v1.TrackingServiceGrpcKt
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import io.grpc.ManagedChannel
import io.grpc.ManagedChannelBuilder
import java.util.concurrent.TimeUnit
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
object GrpcModule {

    @Provides
    @Singleton
    fun provideChannel(): ManagedChannel {
        val builder =
            ManagedChannelBuilder.forAddress(BuildConfig.SERVER_HOST, BuildConfig.SERVER_PORT)
        if (BuildConfig.DEBUG) {
            builder.usePlaintext()
        } else {
            builder.useTransportSecurity()
        }
        return builder
            .keepAliveTime(30, TimeUnit.SECONDS)
            .build()
    }


    @Provides
    @Singleton
    fun provideTrackingStub(channel: ManagedChannel): TrackingServiceGrpcKt.TrackingServiceCoroutineStub {
        return TrackingServiceGrpcKt.TrackingServiceCoroutineStub(channel)
    }
}