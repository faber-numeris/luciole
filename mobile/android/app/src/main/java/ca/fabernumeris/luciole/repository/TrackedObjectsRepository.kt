package ca.fabernumeris.luciole.repository

import ca.fabernumeris.luciole.constants.DEFAULT_COORDINATES
import ca.fabernumeris.luciole.gprpc.IGRPCClient
import ca.fabernumeris.luciole.model.TrackedObject
import ca.fabernumeris.tracking.v1.Coordinate
import ca.fabernumeris.tracking.v1.Position
import kotlinx.coroutines.delay
import javax.inject.Inject


interface ITrackedObjectsRepository {
    suspend fun getTrackedObjects(): List<TrackedObject>
}


class TrackedObjectsRepository @Inject constructor(
    private val grpcClient: IGRPCClient
) : ITrackedObjectsRepository {

    private var currentPosition = Position.newBuilder()
        .setVehicleId("1234")
        .setCoordinate(
            Coordinate.newBuilder()
                .setLatitude(DEFAULT_COORDINATES.latitude)
                .setLongitude(DEFAULT_COORDINATES.longitude)
                .build()
        )
        .build()

    override suspend fun getTrackedObjects(): List<TrackedObject> {
        delay(2000) // Simulate 2 seconds of network latency

        val trackedObjects = mutableListOf<TrackedObject>()


        val latitude = currentPosition.coordinate.latitude
        val longitude = currentPosition.coordinate.longitude

        val newPosition = Position.newBuilder()
            .setVehicleId(currentPosition.vehicleId)
            .setCoordinate(
                Coordinate.newBuilder()
                    .setLatitude(latitude + 0.001)
                    .setLongitude(longitude + 0.001)
                    .build()
            )
            .build()

        currentPosition = newPosition

        trackedObjects.add(TrackedObject("object-1", newPosition))

        return trackedObjects
    }
}