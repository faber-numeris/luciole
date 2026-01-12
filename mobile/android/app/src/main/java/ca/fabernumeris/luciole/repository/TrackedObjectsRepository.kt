package ca.fabernumeris.luciole.repository

import ca.fabernumeris.luciole.constants.DEFAULT_COORDINATES
import ca.fabernumeris.luciole.model.TrackedObject
import ca.fabernumeris.tracking.v1.Coordinate
import ca.fabernumeris.tracking.v1.Position
import kotlinx.coroutines.delay
import javax.inject.Inject
import javax.inject.Singleton


interface ITrackedObjectsRepository {
    suspend fun getTrackedObjects(): List<TrackedObject>
}


class TrackedObjectsRepository @Inject constructor() : ITrackedObjectsRepository {

    private var currentPosition = Position("1234", Coordinate(
        DEFAULT_COORDINATES.latitude,
        DEFAULT_COORDINATES.longitude
    ))

    override suspend fun getTrackedObjects(): List<TrackedObject> {
        delay(2000) // Simulate 2 seconds of network latency

        val trackedObjects = mutableListOf<TrackedObject>()


        val latitude = currentPosition.coordinate?.latitude ?: DEFAULT_COORDINATES.latitude
        val longitude = currentPosition.coordinate?.longitude ?: DEFAULT_COORDINATES.longitude

        val newPosition = Position.Builder()
            .coordinate(coordinate = Coordinate(latitude + 0.001, longitude + 0.001))
            .build()

        currentPosition = newPosition

        trackedObjects.add(TrackedObject("object-1", newPosition))

        return trackedObjects
    }
}