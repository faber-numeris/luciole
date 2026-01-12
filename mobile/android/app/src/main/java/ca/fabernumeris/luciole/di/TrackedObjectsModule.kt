package ca.fabernumeris.luciole.di

import ca.fabernumeris.luciole.repository.ITrackedObjectsRepository
import ca.fabernumeris.luciole.repository.TrackedObjectsRepository
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class TrackedObjectsModule {

    @Binds
    @Singleton
    abstract fun bindTrackedObjectsRepository(
        trackedObjectsRepository: TrackedObjectsRepository
    ): ITrackedObjectsRepository

}