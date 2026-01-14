package ca.fabernumeris.luciole.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import ca.fabernumeris.luciole.constants.DEFAULT_COORDINATES
import ca.fabernumeris.tracking.v1.Coordinate
import ca.fabernumeris.tracking.v1.Position
import ca.fabernumeris.tracking.v1.SubscribeLocationRequest
import ca.fabernumeris.tracking.v1.TrackingServiceGrpcKt
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class TrackedObjectsViewModel @Inject constructor(
    private val trackingStub: TrackingServiceGrpcKt.TrackingServiceCoroutineStub
) : ViewModel() {

    private val _trackedObjects = MutableStateFlow<Map<String, TrackedObject>>(emptyMap())

    val trackedObjects: StateFlow<Map<String, TrackedObject>> = _trackedObjects.asStateFlow()

    fun addTrackedObject(id: String, position: Position) {
        _trackedObjects.value += (id to TrackedObject(id, position))
    }

    fun updateObjectPosition(id: String, newPosition: Position) {
        _trackedObjects.value += (id to TrackedObject(id, newPosition))
    }

    fun removeTrackedObject(id: String) {
        _trackedObjects.value -= id
    }

    init {
        listenForUpdates("client-id-2026")
    }

    fun listenForUpdates(clientID: String) {

        val initialPosition = Position.newBuilder()
            .setCoordinate(
                Coordinate.newBuilder()
                    .setLatitude(DEFAULT_COORDINATES.latitude)
                    .setLongitude(DEFAULT_COORDINATES.longitude)
                    .build()
            )
            .build()
        addTrackedObject("object-1", initialPosition)

        viewModelScope.launch {
            val request = SubscribeLocationRequest.newBuilder()
                .setClientId(clientID)
                .build()

            try {
                // Collect the server-side stream
                trackingStub.subscribeLocation(request).collect { response ->
                    response.positionsList.forEach {
                        updateObjectPosition(it.vehicleId, it)
                    }

                }
            } catch (e: Exception) {
                // Handle gRPC errors (e.g., connection loss) here
                e.printStackTrace()
            }
        }
    }
}




