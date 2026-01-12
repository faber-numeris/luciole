package ca.fabernumeris.luciole.di

import ca.fabernumeris.luciole.gprpc.GRPCClient
import ca.fabernumeris.luciole.gprpc.IGRPCClient
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
abstract class GRPCClientModule {
    @Binds
    @Singleton
    abstract fun bindGRPCClient(
        grpcClient: GRPCClient
    ): IGRPCClient
}